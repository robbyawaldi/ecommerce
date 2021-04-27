import { ProductCarousel } from "../components/frontend/atoms/ProductCarousel"
import { ProductCard } from "../components/frontend/molecules/ProductCard"
import { ProductDetail } from "../components/frontend/molecules/ProductDetail"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"
import styles from '../styles/frontend/Product.module.css'

const Product = () => {
    return (
        <Layouts>
            <div className={styles.box}>
                <ProductCarousel />
                <ProductCard />
                <ProductDetail />
            </div>
        </Layouts>
    )
}

export default withApollo({ssr: true})(Product)