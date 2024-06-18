import Image from 'next/image'
import React from 'react'
import logo from '@/assets/images/sm_logo.png'
import Link from 'next/link'
import { Cormorant } from 'next/font/google'
const font = Cormorant({ subsets: ["cyrillic-ext"], preload: false })

const Logo = () => {
  return (
    <Link href='/' style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <Image src={logo} height={20}/>
        <p className={font.className} style={{fontSize: '24px'}}>Память Якутии</p>
    </Link>
  )
}

export default Logo