import React, { useMemo } from 'react'
import styles from '../../../styles/frontend/Navs.module.css'
import { Categories } from '../atoms/Categories'

interface NavsProps { }

export const Navs: React.FC<NavsProps> = ({ }) => {
    const selected = useMemo(() => 'home', [])

    return (
        <nav className={styles.nav}>
            <ul className={styles.tabs}>
                <li className={`${selected == 'home' ? styles.selected : ''}`}>Beranda</li>
                <li><Categories /></li>
                <li className={`${selected == 'collection' ? styles.selected : ''}`}>Koleksi Eksklusif</li>
                <li className={`${selected == 'about' ? styles.selected : ''}`}>Tentang Siti Hajar</li>
            </ul>
        </nav>
    );
}