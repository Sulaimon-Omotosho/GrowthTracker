import Image from 'next/image'
import React from 'react'

const SmallUserCard = ({ type, figure }: { type: string; figure: string }) => {
  return (
    <div className='rounded-2xl odd:bg-[#CFCEFF] even:bg-[#FAE27C] p-2 flex-1 h-20 '>
      <div className='flex justify-between items-center'>
        <span className='text-[8px] bg-white px-2 py-1 rounded-full text-gray-600'>
          HICC Gbagada
        </span>
        <Image src='/icons/more.png' alt='more' width={15} height={15} />
      </div>
      <h1 className='text-[16px] font-semibold'>{figure}</h1>
      <h2 className='capitalize text-sm font-medium text-gray-500'>{type}</h2>
    </div>
  )
}

export default SmallUserCard
