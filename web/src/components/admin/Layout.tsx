import React from 'react'
import { Header } from './Header'
import { SideBar } from './SideBar'
import styles from '../../styles/AdmLayout.module.css'
import { BottomNavbar } from './BottomNavbar'
import Head from 'next/head'

interface LayoutProps { }

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <BottomNavbar />
            <main className={styles.mainContainer}>
                <Header />
                <div className="overflow-y-auto h-full box-border p-2 pb-28 relative">
                    {children}
                </div>
            </main>
        </div>
    );
}