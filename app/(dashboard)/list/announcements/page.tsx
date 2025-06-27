import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { announcementsData, role } from '@/constants'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { ITEMS_PER_PAGE } from '@/lib/settings'
import { SearchParamProps } from '@/types'
import { Announcement, Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const columns = [
  {
    header: 'Title',
    accessor: 'title',
  },
  {
    header: 'From ',
    accessor: 'from',
  },
  {
    header: 'To ',
    accessor: 'to',
  },
  {
    header: 'Date ',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const AnnouncementList = async ({ searchParams }: SearchParamProps) => {
  const session = await getServerSession(authOptions)

  const params = (await searchParams) || {}
  const pageParam = params.page || 1
  const p = parseInt(pageParam as string)
  const queryParams = { ...params, page: undefined }

  const searchQuery = Array.isArray(params.search)
    ? params.search[0]
    : params.search || ''

  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 dark:even:bg-slate-600 hover:bg-[#F1F0FF]'
    >
      <td className='flex items-center gap-4 p-4'>{item.title}</td>
      <td>{item.from}</td>
      <td>{item.districtId}</td>
      <td className='hidden md:table-cell'>
        {new Intl.DateTimeFormat('en-US').format(item.createdAt)}
      </td>
      <td>
        <div className='flex items-center gap-2'>
          {role === 'admin' && (
            <>
              <FormModal table='announcement' type='update' data={item.id} />
              <FormModal table='announcement' type='delete' id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  )

  const query: Prisma.AnnouncementWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'search':
            query.title = { contains: value, mode: 'insensitive' }
            break
          default:
            break
        }
      }
    }
  }

  const [data, count] = await db.$transaction([
    db.announcement.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    db.announcement.count({ where: query }),
  ])

  const districts = await db.district.findMany({
    select: {
      name: true,
      id: true,
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div className='bg-white dark:bg-black p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>All Announcement</h1>
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
            {role === 'admin' && (
              <FormModal
                table='announcement'
                type='create'
                districts={districts ?? []}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION  */}
      <Pagination page={p} count={count} />
    </div>
  )
}

export default AnnouncementList
