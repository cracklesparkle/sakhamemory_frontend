// src/app/books/book/[id].js
'use client'
import { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styles from '../../page.module.scss'
import Link from 'next/link';
import ContentHeader from '@/app/components/ContentHeader';
import { Cormorant } from 'next/font/google'
const font = Cormorant({ subsets: ["cyrillic-ext"] })

export default function CategoryPage({ params, searchParams }) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        if (params.category) {
            fetch(`/api/movies/movie?category=${decodeURIComponent(params.category)}`)
                .then(async response => {
                    const data = await response.json()
                    setMovies(data)
                })
                .catch(error => console.error('Error fetching movies:', error))
        }
    }, [params.category]);

    if (movies) {
        return (
            <div className={styles.moviePage}>
                <ContentHeader header={decodeURIComponent(params.category)} />
                <div className={styles.videos}>
                    {movies.map((movie, index) => (
                        <div className={`${styles.video} ${font.className}`}>
                            <h1>{movie.title}</h1>
                            <video src={`https://sm2.agiki.ru${movie.video}`} controls preload='none'>
                                Sorry, your browser doesn't support embedded videos, but don't worry, you can
                                <a href="videofile.ogg">download it</a>
                                and watch it with your favorite video player!
                            </video>
                        </div>
                    ))}
                </div>

            </div>
        )
    }

}