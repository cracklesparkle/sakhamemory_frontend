import React from 'react'
import styles from './BlockQuote.module.scss'
import { Inter } from 'next/font/google'
const font = Inter({ subsets: ["cyrillic-ext"] })

const BlockQuote = ({
  title,
  content
}) => {
  return (
    <div className={styles.block_quote}>
        {title ? <h2>{title}</h2> : null}
        <p className={`${font.className}`}>{content}</p>
    </div>
  )
}

export default BlockQuote