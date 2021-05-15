import { Filter } from "../components/frontend/molecules/Filter"
import { Gallery } from "../components/frontend/molecules/Gallery"
import { Sort } from "../components/frontend/molecules/Sort"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"
import styles from '../styles/frontend/Categories.module.css'
import Head from "next/head"

const Categories = () => {
    return (
        <Layouts>
            <Head>
                <title>Kategori Siti Hajar</title>
            </Head>
            <div className={styles.box}>
                <Filter />
                <Sort />
                <Gallery />
            </div>
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Categories)