import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserCard = ({ type, figure }: { type: string; figure: string }) => {
  return (
    <div className='rounded-2xl odd:bg-[#CFCEFF] even:bg-[#FAE27C] p-4 flex-1'>
      <div className='flex justify-between items-center'>
        <span className='text-[10px] bg-white px-2 py-1 rounded-full text-gray-600'>
          HICC Gbagada
        </span>
        <Link href={`/list/${type}`}>
          <Image
            src='/icons/more.png'
            alt='more'
            width={20}
            height={20}
            className='cursor-pointer'
          />
        </Link>
      </div>
      <h1 className='text-2cl font-semibold my-4'>{figure}</h1>
      <h2 className='capitalize text-sm font-medium text-gray-500'>{type}</h2>
    </div>
  )
}

export default UserCard
