import Image from 'next/image'
import React from 'react'
import styles from './Hero.module.scss'
import { Cormorant } from 'next/font/google'
const cormorant = Cormorant({ subsets: ["cyrillic-ext"] })

const Hero = ({
    img = "/static/home/langing.png",
    title = ""
}) => {
    return (
        <div className={styles.hero}>
            <div className={styles.hero_title}>
                <h1 className={cormorant.className}>{title}</h1>
            </div>
            <Image className={styles.hero_image} width={1200} height={760} src={`/${img}`} />
        </div>
    )
}

export default Hero