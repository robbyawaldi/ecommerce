import React from 'react'
import { AdmHeader } from './AdmHeader'
import { SideBar } from './SideBar'
import styles from '../../styles/AdmLayout.module.css'

interface AdmLayoutProps { }

export const AdmLayout: React.FC<AdmLayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.mainContainer}>
                <AdmHeader />
                {children}
            </div>
        </div>
    );
}