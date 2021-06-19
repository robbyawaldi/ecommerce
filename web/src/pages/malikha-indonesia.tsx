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

const Malikha = () => {
    return (
        <Layouts>
            <Head>
                <title>Malikha Indonesia</title>
            </Head>
            <Carousel />
            <div className="w-full my-12">
                <img className="mx-auto w-3/6 md:w-3/12 2xl:w-2/12" src="/assets/logo_malikha.png" alt="logo malikha" />
            </div>
            <Gallery />
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Malikha)