import Image from 'next/image'
import React from 'react'
import landing from '@/assets/images/landing.jpg'
import styles from './Hero.module.scss'
import { Cormorant } from 'next/font/google'
const cormorant = Cormorant({ subsets: ["cyrillic-ext"] })

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.hero_title}>
                <h1 className={cormorant.className}>Память Якутии</h1>
            </div>
            <Image className={styles.hero_image} width={1200} height={760} src={landing} />
        </div>
    )
}

export default Hero