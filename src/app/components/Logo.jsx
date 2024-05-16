import Image from 'next/image'
import React from 'react'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'
const Logo = () => {
  return (
    <Link href='/'>
        <Image src={logo} height={56}/>
    </Link>
  )
}

export default Logo