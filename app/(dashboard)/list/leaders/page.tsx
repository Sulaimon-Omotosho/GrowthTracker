import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, studentsData } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Leader = {
  id: number
  studentId: string
  name: string
  email?: string
  photo: string
  phone?: string
  grade: number
  class: string
  address: string
}

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Member ID',
    accessor: 'memberId',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Department',
    accessor: 'department',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Phone',
    accessor: 'phone',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Address',
    accessor: 'address',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const LeadersList = ({ params: { userId } }: SearchParamProps) => {
  const renderRow = (item: Leader) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 dark:even:bg-slate-600 hover:bg-susuPurpleLight dark:hover:bg-susuPurple'
    >
      <td className='flex items-center gap-4 p-4'>
        <Image
          src={item.photo}
          alt='image'
          width={40}
          height={40}
          className='md:hidden xl:block w-10 h-10 rounded-full object-fit'
        />
        <div className='flex flex-col '>
          <h3 className='font-semibold'>{item.name}</h3>
          <p className='text-xs text-gray-500'>{item?.class}</p>
        </div>
      </td>
      <td className='hidden md:table-cell'>{item.studentId}</td>
      <td className='hidden md:table-cell'>{item.grade}</td>
      <td className='hidden lg:table-cell'>{item.phone}</td>
      <td className='hidden lg:table-cell'>{item.address}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/member/${userId}/list/leaders/${item.id}`}>
            <button className='flex items-center justify-center rounded-full bg-susuSky'>
              <Image
                src='/assets/icons/view.png'
                width={16}
                height={16}
                alt='view'
              />
            </button>
          </Link>
          {role === 'admin' && (
            <FormModal table='student' type='delete' id={item.id} />
          )}
        </div>
      </td>
    </tr>
  )

  return (
    <div className='bg-white dark:bg-dark-200 p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>All Leaders</h1>
        <div className='flex flex-col md:flex-row gap-4 items-center w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center bg-susuYellow rounded-full'>
              <Image
                src='/assets/icons/filter.png'
                alt='filter button'
                width={14}
                height={14}
              />
            </button>
            <button className='w-8 h-8 flex items-center justify-center bg-susuYellow rounded-full'>
              <Image
                src='/assets/icons/sort.png'
                alt='sort button'
                width={14}
                height={14}
              />
            </button>
            {role === 'admin' && <FormModal table='student' type='create' />}
          </div>
        </div>
      </div>
      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={studentsData} />
      <Pagination />
    </div>
  )
}

export default LeadersList
