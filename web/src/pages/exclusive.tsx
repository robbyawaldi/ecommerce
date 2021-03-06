import dynamic from "next/dynamic"
import Head from "next/head"
import { CarouselProps } from "../components/frontend/atoms/Carousel"
import { Gallery } from "../components/frontend/molecules/Gallery"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"
const Carousel = dynamic(
    () => import('../components/frontend/atoms/Carousel')
      .then((component) => component.Carousel as any),
    { ssr: false }
  ) as React.ComponentType<CarouselProps>

const Exclusive = () => {
    return (
        <Layouts>
            <Head>
                <title>Koleksi Eksklusif</title>
            </Head>
            <Carousel />
            <h1 className="text-center text-2xl my-12">KOLEKSI EKSKLUSIF</h1>
            <Gallery />
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Exclusive)