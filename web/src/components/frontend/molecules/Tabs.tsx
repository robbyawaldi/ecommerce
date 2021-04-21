import React from 'react'
import styles from '../../../styles/frontend/Tabs.module.css'

interface TabsProps { }

export const Tabs: React.FC<TabsProps> = ({ }) => {
    return (
        <ul className={styles.tabs}>
            <li>Beranda</li>
            <li>Kategori</li>
            <li>Koleksi Eksklusif</li>
            <li>Tentang Siti Hajar</li>
        </ul>
    );
}