import Table from '@/components/dashboard/Table'
import TableSearch from '@/components/dashboard/TableSearch'
import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import db from '@/prisma/db'
import { SearchParamProps, UserTypes } from '@/types'
import { ITEMS_PER_PAGE } from '@/utils/settings'
import { Prisma } from '@prisma/client'
import { UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Position',
    accessor: 'position',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Team',
    accessor: 'team',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Phone',
    accessor: 'phone',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Email',
    accessor: 'email',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const LeadersList = async ({ searchParams }: any) => {
  const params = (await searchParams) || {}
  const pageParam = params.page || 1
  const p = parseInt(pageParam as string)
  const queryParams = { ...params, page: undefined }

  const searchQuery = Array.isArray(params.search)
    ? params.search[0]
    : params.search || ''

  const renderRow = (item: UserTypes) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 hover:bg-[#F1F0FF] dark:hover:bg-[#CFCEFF]'
    >
      <td className='flex items-center gap-4 p-4'>
        {item.image ? (
          <Image
            src={item.image}
            alt='image'
            width={40}
            height={40}
            className='md:hidden xl:block w-10 h-10 rounded-full object-fit'
          />
        ) : (
          <UserIcon className='w-10 h-10 p-2 bg-[#C3EBFA] rounded-full ring-1 ring-gray-300 text-gray-500' />
        )}

        <div className='flex flex-col '>
          <h3 className='font-semibold'>{item.name}</h3>
          <p className='text-xs text-gray-500'>{item?.gender}</p>
        </div>
      </td>
      {/* <td className='hidden md:table-cell'>
        {item.TeamPastor ? `Team Pastor of ${item.department?.team}`}
        </td> */}
      <td className='hidden md:table-cell'>
        {item.hod
          ? `Head of ${item.hod.name}`
          : item.TeamPastor
          ? `Team Pastor of ${item.TeamPastor.name}`
          : item.districtPastor
          ? `District Pastor of ${item.districtPastor.name}`
          : item.communityPastor
          ? `Community Pastor of ${item.communityPastor.name}`
          : item.zonalLeader
          ? `Zonal Leader of ${item.zonalLeader.name}`
          : item.cellLeader
          ? `Cell Leader of ${item.cellLeader.name}`
          : // : item.department
            // ? item.department.name
            'N/A'}
      </td>
      <td className='hidden md:table-cell'>
        {item.hod ? item.hod.team.name : 'Membership'}{' '}
      </td>
      <td className='hidden lg:table-cell'>{item.phone}</td>
      <td className='hidden lg:table-cell'>{item.email}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/members/${item.id}`}>
            <button className='flex items-center justify-center rounded-full bg-[#C3EBFA] cursor-pointer'>
              <Image src='/icons/view.png' width={16} height={16} alt='view' />
            </button>
          </Link>
          {/* {role === 'admin' && (
            <FormModal table='student' type='delete' id={item.id} />
          )} */}
        </div>
      </td>
    </tr>
  )

  // QUERY FROM DB
  const query: Prisma.UserWhereInput = {
    OR: [
      { districtPastor: { isNot: null } },
      { communityPastor: { isNot: null } },
      { TeamPastor: { isNot: null } },
      { hod: { isNot: null } },
      { zonalLeader: { isNot: null } },
      { cellLeader: { isNot: null } },
    ],
  }

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.OR = [
              { name: { contains: searchQuery, mode: 'insensitive' } },
              {
                department: {
                  name: { contains: searchQuery, mode: 'insensitive' },
                },
              },
              {
                department: {
                  team: {
                    name: { contains: searchQuery, mode: 'insensitive' },
                  },
                },
              },
              {
                cell: { name: { contains: searchQuery, mode: 'insensitive' } },
              },
              {
                cell: {
                  zone: {
                    name: { contains: searchQuery, mode: 'insensitive' },
                  },
                },
              },
              {
                cell: {
                  zone: {
                    community: {
                      name: { contains: searchQuery, mode: 'insensitive' },
                    },
                  },
                },
              },
              {
                cell: {
                  zone: {
                    community: {
                      district: {
                        name: { contains: searchQuery, mode: 'insensitive' },
                      },
                    },
                  },
                },
              },
            ]
        }
      }
    }
  }

  const [data, count] = await db.$transaction([
    db.user.findMany({
      where: query,
      orderBy: { name: 'asc' },
      include: {
        // department: {
        //   select: { name: true, team: { select: { name: true } } },
        // },
        // cell: {
        //   select: {
        //     name: true,
        //     zone: {
        //       select: {
        //         name: true,
        //         community: {
        //           select: { name: true, district: { select: { name: true } } },
        //         },
        //       },
        //     },
        //   },
        // },
        cellLeader: { select: { name: true } },
        zonalLeader: { select: { name: true } },
        districtPastor: { select: { name: true } },
        communityPastor: { select: { name: true } },
        TeamPastor: { select: { name: true } },
        hod: { select: { name: true, team: { select: { name: true } } } },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    db.user.count({
      where: query,
    }),
  ])

  // console.log('Total number:', count)

  return (
    <div className='bg-white dark:bg-dark-200 p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>All Leaders</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-[#FAE27C] cursor-pointer rounded-full'>
              <Image
                src='/icons/filter.png'
                alt='filter button'
                width={14}
                height={14}
              />
            </button>
            <button className='w-8 h-8 flex items-center justify-center bg-[#FAE27C] cursor-pointer rounded-full'>
              <Image
                src='/icons/sort.png'
                alt='sort button'
                width={14}
                height={14}
              />
            </button>
            {/* {role === 'admin' && <FormModal table='student' type='create' />} */}
          </div>
        </div>
      </div>
      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  )
}

export default LeadersList
