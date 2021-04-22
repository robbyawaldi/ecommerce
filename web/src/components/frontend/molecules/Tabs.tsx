import React, { useMemo } from 'react'
import styles from '../../../styles/frontend/Tabs.module.css'
import { Categories } from '../atoms/Categories'

interface TabsProps { }

export const Tabs: React.FC<TabsProps> = ({ }) => {
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