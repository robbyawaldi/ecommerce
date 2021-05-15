import React from 'react'
import { Footer } from '../organisms/Footer';
import { Header } from '../organisms/Header';
import styles from '../../../styles/frontend/Layouts.module.css'
import CartContextProvider from '../../../contexts/CartContext';
import Head from 'next/head';

interface layoutProps { }

export const Layouts: React.FC<layoutProps> = ({ children }) => {
    return (
        <CartContextProvider>
            <div className={styles.box}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <main className="2xl:px-96 lg:px-24 px-4 py-2 overflow-x-hidden">
                    {children}
                </main>
                <Footer />
            </div>
        </CartContextProvider>
    );
}