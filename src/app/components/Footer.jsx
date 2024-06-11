import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import DropDown from './DropDown'
import Logo from './Logo'
const font = Inter({ subsets: ["cyrillic-ext"], preload: false })

const Footer = () => {
  return (
    <nav className={`${styles.footer} ${font.className}`}>
      <p>{new Date().getFullYear()}</p>
      <p>Сводный каталог якутской книги</p>
    </nav>
  )
}

export default Footer