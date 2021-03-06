import React from 'react'
import { AdmHeader } from './AdmHeader'
import { SideBar } from './SideBar'
import styles from '../../styles/AdmLayout.module.css'

interface AdmLayoutProps { }

export const AdmLayout: React.FC<AdmLayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <SideBar />
            <main className={styles.mainContainer}>
                <AdmHeader />
                <div className="overflow-y-auto h-full box-border p-2 relative">
                    {children}
                </div>
            </main>
        </div>
    );
}