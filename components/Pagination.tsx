'use client'

import { ITEMS_PER_PAGE } from '@/utils/settings'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE)

  const rangeStart = Math.max(page - 2, 1)
  const rangeEnd = Math.min(page + 3, totalPages)

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`${window.location.pathname}?${params.toString()}`)
  }

  return (
    <div className='p-4 flex justify-between items-center text-gray-500 cursor-default'>
      <button
        className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
        onClick={() => {
          changePage(page - 1)
        }}
        disabled={!hasPrev}
      >
        Prev
      </button>
      <div className='flex items-center gap-2 text-sm'>
        {rangeStart > 1 && (
          <>
            <button
              onClick={() => changePage(1)}
              className='px-2 rounded-sm cursor-pointer'
            >
              1
            </button>
            <span>...</span>
          </>
        )}
        {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => {
          const pageIndex = rangeStart + index
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm cursor-pointer ${
                page === pageIndex ? 'bg-[#C3EBFA]' : ''
              }`}
              onClick={() => {
                changePage(pageIndex)
              }}
            >
              {pageIndex}
            </button>
          )
        })}
        {rangeEnd < totalPages && (
          <>
            <span>...</span>
            <button
              onClick={() => changePage(totalPages)}
              className='px-2 rounded-sm cursor-pointer'
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      <button
        className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
        onClick={() => {
          changePage(page + 1)
        }}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
