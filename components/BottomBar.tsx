import Image from 'next/image'
import React from 'react'

const images = [
  '/images/HiccChangingLives.jpeg',
  '/images/HICC-logo.jpg',
  '/images/HiccGrowthTrackLogo.jpg',
  '/images/HiccHaefLogo.png',
  '/images/HiccHsapLogo.png',
  '/images/HiccNLPLogo.png',
]

const BottomBar = () => {
  return (
    <div className='flex items-center justify-between p-4 h-24 overflow-hidden whitespace-nowrap mx-5 xl:mx-96 lg:mx-40 md:mx-10'>
      <div className='flex animate-scroll items-center gap-8 md:gap-16'>
        {images.map((src, i) => (
          <div className='flex-shrink-0 size-20 relative' key={i}>
            <Image
              src={src}
              alt={`carousel-${i}`}
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomBar
