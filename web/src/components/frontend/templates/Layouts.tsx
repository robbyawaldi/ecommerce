import React from 'react'
import { Footer } from '../organisms/Footer';
import { Header } from '../organisms/Header';
import styles from '../../../styles/frontend/Layouts.module.css'

interface layoutProps { }

export const Layouts: React.FC<layoutProps> = ({ children }) => {
    return (
        <div className={styles.box}>
            <Header />
            <main className="md:px-24 px-4 py-2 overflow-x-hidden">
                {children}
            </main>
            <Footer />
        </div>
    );
}