import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import styles from '../../../styles/frontend/Navs.module.css'
import { CategoryMenu } from '../atoms/CategoryMenu'

interface NavsProps { }

export const Navs: React.FC<NavsProps> = ({ }) => {
    const router = useRouter()
    const selected = useMemo(() => router.route, [router.route])

    return (
        <nav className={styles.nav}>
            <ul className={styles.tabs}>
                <Link href="/">
                    <li className={`${selected == '/' ? styles.selected : ''}`}>Beranda</li>
                </Link>
                <li><CategoryMenu /></li>
                <Link href="/exclusive">
                    <li className={`${selected == '/exclusive' ? styles.selected : ''}`}>Koleksi Eksklusif</li>
                </Link>
                <Link href="/malikha-indonesia">
                    <li className={`${selected == '/malikha-indonesia' ? styles.selected : ''}`}>Malikha Indonesia</li>
                </Link>
                <Link href="/about">
                    <li className={`${selected == '/about' ? styles.selected : ''}`}>Tentang Siti Hajar</li>
                </Link>
            </ul>
        </nav>
    );
}