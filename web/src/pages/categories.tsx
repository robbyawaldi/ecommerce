import { Filter } from "../components/frontend/molecules/Filter"
import { Gallery } from "../components/frontend/molecules/Gallery"
import { Sort } from "../components/frontend/molecules/Sort"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"
import styles from '../styles/frontend/Categories.module.css'

const Categories = () => {
    return (
        <Layouts>
            <div className={styles.box}>
                <Filter />
                <Sort />
                <Gallery />
            </div>
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Categories)