import React from 'react'
import styles from './ContentHeader.module.scss'
import { Cormorant, Inter, Montserrat } from 'next/font/google'
const font = Montserrat({ subsets: ["cyrillic-ext"], preload: false })
const ContentHeader = ({header}) => {
  return (
    <div className={`${styles.content_header} ${font.className}`}>
        {header}
    </div>
  )
}

export default ContentHeader