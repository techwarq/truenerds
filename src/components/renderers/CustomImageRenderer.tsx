'use client'

import Image from 'next/image'

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className='my-4 max-w-[550px] rounded-2xl overflow-hidden'>
      <div className='relative aspect-[16/9]'>
        <Image 
          alt='image' 
          className='object-cover' 
          fill 
          src={src}
          sizes="(max-width: 550px) 100vw, 550px"
        />
      </div>
    </div>
  )
}

export default CustomImageRenderer