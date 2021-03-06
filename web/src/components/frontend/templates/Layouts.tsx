import React from 'react'
import { Footer } from '../organisms/Footer';
import { Header } from '../organisms/Header';
import styles from '../../../styles/frontend/Layouts.module.css'
import CartContextProvider from '../../../contexts/CartContext';
import Head from 'next/head';
import { SiWhatsapp } from 'react-icons/si'
import { useState } from 'react';
import { isServer } from '../../../utils/isServer';
import { useEffect } from 'react';
import { onWhatsappOpen } from '../../../utils/onWhatsappOpen';

interface layoutProps { }

export const Layouts: React.FC<layoutProps> = ({ children }) => {
    const [prevScrollPos, setScrollPos] = useState(isServer() ? 0 : window.pageYOffset)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [prevScrollPos])

    const handleScroll = () => {
        setScrollPos(window.pageYOffset)
        setVisible(prevScrollPos > window.pageYOffset)
    };

    return (
        <CartContextProvider>
            <div className={styles.box}>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <main className={styles.main}>
                    {children}
                    <div className={`${styles.popUp} ${visible ? '': styles.hidden}`} onClick={onWhatsappOpen}>
                        <SiWhatsapp />
                        Butuh Bantuan
                    </div>
                </main>
                <Footer />
            </div>
        </CartContextProvider>
    );
}