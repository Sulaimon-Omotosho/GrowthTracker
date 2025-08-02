'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const TableSearch = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const prevSearchRef = useRef<string>('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (search) {
        params.set('search', search)
      } else {
        params.delete('search')
      }
      if (prevSearchRef.current !== search) {
        params.set('page', '1')
      }

      prevSearchRef.current = search

      router.push(`${window.location.pathname}?${params.toString()}`)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [search, searchParams, router])

  return (
    <div className='w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
      <Image src='/icons/search.png' alt='search' width={14} height={14} />
      <input
        type='text'
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-[200px] p-2 bg-transparent outline-none'
      />
    </div>
  )
}

export default TableSearch
