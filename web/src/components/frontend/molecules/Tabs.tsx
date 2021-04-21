import React, { useMemo } from 'react'
import styles from '../../../styles/frontend/Tabs.module.css'

interface TabsProps { }

export const Tabs: React.FC<TabsProps> = ({ }) => {
    const selected = useMemo(() => 'home', [])

    return (
        <ul className={styles.tabs}>
            <li className={`${selected == 'home' ? styles.selected : ''}`}>Beranda</li>
            <li>Kategori</li>
            <li className={`${selected == 'collection' ? styles.selected : ''}`}>Koleksi Eksklusif</li>
            <li className={`${selected == 'about' ? styles.selected : ''}`}>Tentang Siti Hajar</li>
        </ul>
    );
}