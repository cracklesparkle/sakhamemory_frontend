import React from 'react'
import styles from './DropDown.module.scss'
import Link from 'next/link'
import { Cormorant } from 'next/font/google'
const font = Cormorant({ subsets: ["cyrillic-ext"] })

const DropDown = ({ link, links }) => {
    return (
        <div className={`${styles.dropdown} ${font.className}`}>
            <Link href={link.link} className={styles.dropbtn}>
                {link.name}
            </Link>
            {links.length > 0 &&
                <div className={styles.dropdown_content}>
                    {links.map((link, index) => (
                        <Link href={link.link}>{link.name}</Link>
                    ))}
                </div>
            }
        </div>
    )
}

export default DropDown