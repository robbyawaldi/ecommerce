import Head from "next/head"
import { useRouter } from "next/router"
import { Gallery } from "../components/frontend/molecules/Gallery"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"

const Search = () => {
    const router = useRouter()
    const keyword = router.query.keyword

    return (
        <Layouts>
            <Head>
                <title>Jual {keyword}</title>
            </Head>
            <div className="mt-5">
            <Gallery />
            </div>
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Search)