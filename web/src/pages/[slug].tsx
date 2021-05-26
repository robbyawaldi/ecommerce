import { ProductCarousel } from "../components/frontend/atoms/ProductCarousel"
import { ProductCard } from "../components/frontend/molecules/ProductCard"
import { ProductDetail } from "../components/frontend/molecules/ProductDetail"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"
import styles from '../styles/frontend/Product.module.css'
import { useRouter } from "next/router"
import { Image, Product as ProductGraphql, useProductQuery } from "../generated/graphql"
import React, { useMemo } from "react"
import { loadingOrQueryFailed } from "../utils/loadingOrQueryFailed"
import Head from "next/head"
import { PageNotFound } from "../components/frontend/atoms/PageNotFound"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { IoIosArrowForward } from "react-icons/io"

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
                    <>
                        <Breadcrumb separator={<img src="/assets/1fsxS23o.svg" className="transform rotate-90 w-6" />}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink href="#">Detail Produk</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>

                        <div className={styles.box}>
                            <ProductCarousel images={data?.product?.images as Image[]} />
                            <ProductCard product={data?.product as ProductGraphql} />
                            <ProductDetail product={data?.product as ProductGraphql} />
                        </div>
                    </>
                )
            }
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Product)