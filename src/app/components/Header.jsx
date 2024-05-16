import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import DropDown from './DropDown'
import Logo from './Logo'
const font = Inter({ subsets: ["cyrillic-ext"] })

const Header = () => {
  return (
    <nav className={`${styles.header} ${font.className}`}>
      <Logo />
      <DropDown link={{ name: 'Национальная библиотека РС(Я)', link: '/' }} links={[{ name: '/', link: '/' }]} />
      <DropDown link={{ name: 'Национальный архив РС(Я)', link: '/' }} links={[]} />
      <DropDown link={{ name: 'Музей им. Е. Ярославского', link: '/' }} links={[]} />
      <DropDown
        link={{ name: 'Госкинохранилище', link: '/goskino' }}
        links={[{name: 'Кинодокументы', link: '/goskino/categories'}]}
      />
    </nav>
  )
}

export default Header