import React from 'react'
import styles from './ContentHeader.module.scss'
import { Cormorant } from 'next/font/google'
const font = Cormorant({ subsets: ["cyrillic-ext"] })
const ContentHeader = ({header}) => {
  return (
    <div className={`${styles.content_header} ${font.className}`}>
        {header}
    </div>
  )
}

export default ContentHeader