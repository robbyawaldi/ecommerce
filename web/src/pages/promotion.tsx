import Head from "next/head"
import React from "react"
import { Carousel } from "../components/frontend/atoms/Carousel"
import { Gallery } from "../components/frontend/molecules/Gallery"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"

const Promotion = () => {
    return (
        <Layouts>
            <Head>
                <title>Promotion</title>
            </Head>
            <Carousel />
            <h1 className="text-center text-2xl my-12">Promo</h1>
            <Gallery />
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Promotion)