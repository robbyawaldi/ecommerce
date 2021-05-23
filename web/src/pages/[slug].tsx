import { ProductCarousel } from "../components/frontend/atoms/ProductCarousel"
import { ProductCard } from "../components/frontend/molecules/ProductCard"
import { ProductDetail } from "../components/frontend/molecules/ProductDetail"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"
import styles from '../styles/frontend/Product.module.css'
import { useRouter } from "next/router"
import { Image, Product as ProductGraphql, useProductQuery } from "../generated/graphql"
import { useMemo } from "react"
import { loadingOrQueryFailed } from "../utils/loadingOrQueryFailed"
import Head from "next/head"
import Error from "next/error"
import { PageNotFound } from "../components/frontend/atoms/PageNotFound"

const Product = () => {
    const router = useRouter()
    const slug = useMemo(() => router.query.slug, [router.query])
    const { data, error, loading } = useProductQuery({
        variables: {
            slug: slug as string
        },
        notifyOnNetworkStatusChange: true
    })

    const errorCategoryMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorCategoryMessage) {
        return errorCategoryMessage
    }

    return (
        <Layouts>
            <Head>
                <title>{data?.product ? `Jual ${data.product.title}` : '404 - Halaman tidak ditemukan'}</title>
            </Head>
            {data?.product == null
                ? <PageNotFound />
                : (
                    <div className={styles.box}>
                        <ProductCarousel images={data?.product?.images as Image[]} />
                        <ProductCard product={data?.product as ProductGraphql} />
                        <ProductDetail product={data?.product as ProductGraphql} />
                    </div>
                )
            }
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Product)