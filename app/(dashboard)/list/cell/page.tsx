import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { CellTypes, SearchParamProps } from '@/types'
import { Prisma } from '@prisma/client'
import { UserIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Cell Name',
    accessor: 'cellName',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Community',
    accessor: 'community',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'District',
    accessor: 'district',
    className: 'hidden md:table-cell',
  },

  {
    header: 'Phone',
    accessor: 'phone',
    className: 'hidden lg:table-cell',
  },

  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const CellLeadersList = async ({ searchParams }: SearchParamProps) => {
  const session = await getServerSession(authOptions)

  const params = (await searchParams) || {}
  const pageParam = params.page || 1
  const p = parseInt(pageParam as string)
  const queryParams = { ...params, page: undefined }

  const searchQuery = Array.isArray(params.search)
    ? params.search[0]
    : params.search || ''

  const renderRow = (item: CellTypes) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50  hover:bg-[#F1F0FF] dark:hover:bg-[#CFCEFF]'
    >
      <td className='flex items-center gap-4 p-4'>
        {item.leader?.image ? (
          <Image
            src={item.leader.image}
            alt='image'
            width={40}
            height={40}
            className='md:hidden xl:block w-10 h-10 rounded-full object-fit'
          />
        ) : (
          <UserIcon className='w-10 h-10 p-2 bg-[#C3EBFA] rounded-full ring-1 ring-gray-300 text-gray-500' />
        )}
        <div className='flex flex-col '>
          <h3 className='font-semibold'>{item.leader?.name}</h3>
          <p className='text-xs text-gray-500'>{item?.leader?.gender}</p>
        </div>
      </td>
      <td className='hidden md:table-cell'>{item.name}</td>
      <td className='hidden md:table-cell'>{item.zone.community.name}</td>
      <td className='hidden lg:table-cell'>
        {item.zone.community.district.name}
      </td>
      <td className='hidden lg:table-cell'>{item.leader?.phone}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/members/${item.leaderId}`}>
            <button className='flex items-center justify-center rounded-full bg-[#C3EBFA] cursor-pointer'>
              <Image src='/icons/view.png' width={20} height={20} alt='view' />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  )

  // QUERY FROM DB
  const query: Prisma.CellWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.OR = [
              { name: { contains: searchQuery, mode: 'insensitive' } },
              {
                zone: {
                  community: {
                    name: { contains: searchQuery, mode: 'insensitive' },
                  },
                },
              },
              {
                leader: {
                  name: { contains: searchQuery, mode: 'insensitive' },
                },
              },
              {
                zone: {
                  community: {
                    district: {
                      name: { contains: searchQuery, mode: 'insensitive' },
                    },
                  },
                },
              },
            ]
            break
          default:
            break
        }
      }
    }
  }
  const [data, count] = await db.$transaction([
    db.cell.findMany({
      where: query,
      orderBy: { zone: { community: { district: { name: 'asc' } } } },
      include: {
        leader: {
          select: {
            name: true,
            phone: true,
            image: true,
            gender: true,
          },
        },
        zone: {
          include: {
            community: { include: { district: { select: { name: true } } } },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    db.cell.count({
      where: query,
    }),
  ])

  return (
    <div className='bg-white dark:bg-black p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>Cell Leaders</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-[#FAE27C] rounded-full'>
              <Image
                src='/icons/filter.png'
                alt='filter button'
                width={14}
                height={14}
              />
            </button>
            <button className='w-8 h-8 flex items-center justify-center bg-[#FAE27C] rounded-full'>
              <Image
                src='/icons/sort.png'
                alt='sort button'
                width={14}
                height={14}
              />
            </button>
          </div>
        </div>
      </div>
      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  )
}

export default CellLeadersList
