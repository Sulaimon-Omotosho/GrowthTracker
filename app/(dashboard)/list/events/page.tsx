import Table from '@/components/dashboard/Table'
import TableSearch from '@/components/dashboard/TableSearch'
import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import { eventsData, role } from '@/constants'
import { Event } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const columns = [
  {
    header: 'Title',
    accessor: 'title',
  },
  {
    header: 'Department ',
    accessor: 'department',
  },
  {
    header: 'Date ',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Start Time',
    accessor: 'startTime',
    className: 'hidden md:table-cell',
  },
  {
    header: 'End Time',
    accessor: 'endTime',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const EventsList = () => {
  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 hover:bg-[#F1F0FF] dark:hover:bg-[#CFCEFF]'
    >
      <td className='flex items-center gap-4 p-4'>{item.title}</td>
      <td>{item.class}</td>
      <td className='hidden md:table-cell'>{item.date}</td>
      <td className='hidden md:table-cell'>{item.startTime}</td>
      <td className='hidden md:table-cell'>{item.endTime}</td>
      <td>
        <div className='flex items-center gap-2'>
          {role === 'admin' && (
            <>
              <FormModal
                table='event'
                type='update'
                data={item}
                districts={{
                  name: '',
                  id: '',
                }}
              />
              <FormModal
                table='event'
                type='delete'
                id={item.id}
                districts={{
                  name: '',
                  id: '',
                }}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  )

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP  */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block'>All Events</h1>
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
                table='event'
                type='create'
                districts={{
                  name: '',
                  id: '',
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST  */}
      <Table columns={columns} renderRow={renderRow} data={eventsData} />
      {/* PAGINATION  */}
      <Pagination page={0} count={0} />
    </div>
  )
}

export default EventsList
