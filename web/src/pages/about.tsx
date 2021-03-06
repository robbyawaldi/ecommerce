import { withApollo } from "../utils/withApollo"
import styles from '../styles/frontend/About.module.css'
import { Header } from "../components/frontend/organisms/Header"
import { Footer } from "../components/frontend/organisms/Footer"
import Head from "next/head"
import Image from "next/image"

const wording = {
    about: [
        "Dalam perjalanan kami totalitas harus ada di setiap rancangan guna menghadirkan keindahan dan kenyamanan yang istimewa.",
        "Bermula dari tahun 2001, kami  melewati berbagai trend fashion dan terus mengembangkan rancangan dari material hingga design nya sampai sekarang.",
        "Pada produk kami penggunaan material sangat ditonjolkan. Meskipun material yang kami dapat langka, kami juga mengupayakan untuk menetapkan harga bersaing di kelasnya.",
        "Bukan hanya kualitas, sumber yang kami pesan berasal dari Indonesia sehingga saling mendukung untuk mengembangkan perekonomian Indonesia."
    ],
    text1: {
        header: 'Kebanggaan adalah Kebahagiaan',
        body: 'Kebanggaan yang diterima berbuah  bahagia dan menjadi jalan anda berbagi'
    },
    text2: {
        header: 'Menemukan Rasa yang sama',
        body: 'Kenyamanan yang kami hadirkan demi ketenangan yang sama-sama didambakan'
    },
    text3: {
        header: 'Modern Trendy',
        body: 'Berkomitmen memberikan rancangan terbaik di setiap kreasi serta meningkatkan kepuasan di setiap inovasi kami'
    }
}

const About = () => {
    return (
        <>
            <Head>
                <title>Tentang Siti Hajar</title>
            </Head>
            <Header />
            <div className={styles.box}>
                <div className="pt-6 relative mb-12">
                    <div className="bg-gold w-48 h-10 absolute top-10 z-0">
                        <div className={`w-36 absolute ${styles.logo}`}>
                            <Image src="/assets/logo-black.svg" alt="logo" width={200} height={90} />
                        </div>
                    </div>
                    <h1 className="font-bold text-2xl relative"><span className="text-4xl">T</span>ENTANG</h1>
                </div>
                {wording.about.map((wording: string, i: number) => (
                    <p key={i} className="mt-6">{wording}</p>
                ))}
                <div className={styles.wrap}>
                    <Image src="/assets/smile.svg" alt="smile image" width={100} height={100} />
                    <div>
                        <h1 className="font-bold">{wording.text1.header}</h1>
                        <p>{wording.text1.body}</p>
                    </div>

                    <Image src="/assets/wind.svg" alt="wind image" width={100} height={100} />
                    <div>
                        <h1 className="font-bold">{wording.text2.header}</h1>
                        <p>{wording.text2.body}</p>
                    </div>

                    <Image src="/assets/lamp.svg" alt="lamp image" width={100} height={100} />
                    <div>
                        <h1 className="font-bold">{wording.text3.header}</h1>
                        <p>{wording.text3.body}</p>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default withApollo({ ssr: true })(About)