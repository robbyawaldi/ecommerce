import React, { useMemo } from 'react'
import styles from '../../../styles/frontend/Footer.module.css'

interface FooterProps { }

export const Footer: React.FC<FooterProps> = ({ }) => {
    const years = useMemo(() => new Date().getFullYear(), [])

    return (
        <footer>
            <div className={styles.footerTop}>
                <img src="/assets/logo-white.svg" alt="logo white"/>
                <h1>#TrendIslami</h1>
            </div>
            <div className={styles.container}>
                <address className={styles.contact}>
                    <h1>KONTAK KAMI</h1>
                    <p>
                        Email: <a href="mailto:sitihajar@gmail.com">sitihajar@gmail.com</a>
                    </p>
                    <p>
                        Telepon: <a href="tel:+6282127888393">082127888393</a>
                    </p>
                </address>
                <div className={styles.address}>
                    <h1>SITI HAJAR OFFICE</h1>
                    <p>Ruko MTC Blok J-10 Jalan Soekarno Hatta Bandung 40212</p>
                </div>
                <div className={styles.about}>
                    <h1>SITI HAJAR</h1>
                    <a href="#">Tentang Kami</a>
                </div>
                <div className={styles.service}>
                    <h1>PELAYANAN PELANGGAN</h1>
                    <a href="#">FAQ</a>
                    <a href="#">Syarat dan Ketentuan</a>
                </div>
                <div className={styles.social}>
                    <h1>IKUTI KAMI</h1>
                    <a href="">Instagram</a>
                    <a href="">Facebook</a>
                    <a href="">Whatsapp</a>
                </div>
                <div className={styles.payment}>
                    <h1>PEMBAYARAN</h1>
                    <img src="/assets/bca.svg" alt="bca"/>
                    <img src="/assets/mandiri.svg" alt="mandiri"/>
                    <img src="/assets/bri.svg" alt="bri"/>
                </div>
            </div>
            <div className="text-center font-bold mb-2">
                <p>Copyright @{years} Siti Hajar</p>
            </div>
        </footer>
    );
}