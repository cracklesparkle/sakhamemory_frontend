import React from 'react'
import styles from './BlockQuote.module.scss'
import { Inter } from 'next/font/google'
const font = Inter({ subsets: ["cyrillic-ext"] })

const BlockQuote = ({content}) => {
  return (
    <div className={styles.block_quote}>
        <p className={`${font.className}`}>{content}</p>
    </div>
  )
}

export default BlockQuote