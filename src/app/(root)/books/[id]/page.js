// src/app/books/book/[id].js
'use client'
import { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styles from './page.module.scss'

export default function BookPage({ params, searchParams }) {
  const [pages, setPages] = useState([])

  useEffect(() => {
    if (params.id) {
      fetch(`/api/books/pages?id=${params.id}`)
        .then(async response => {
          const data = await response.json()
          setPages(data)
        })
        .catch(error => console.error('Error fetching pages:', error))
    }
  }, [params.id]);

  if (pages) {
    return (
      <div className={styles.book_page}>
        <h1>{params.id}</h1>
        <HTMLFlipBook className={styles.book} showCover width={390} height={550}>
          {pages.map((page, index) => (
            <div key={`page-${index}`} className={styles.demoPage}>
              <img
                className={styles.imgPage}
                style={{ objectFit: "contain" }}
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${page.file}`} height={"100%"} width={"auto"} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    )
  }
}