import { Layout } from "../../components/admin/Layout"
import { useIsAuth } from "../../utils/useIsAuth"
import { withApollo } from "../../utils/withApollo"

const Adm = () => {
    useIsAuth()

    return (
        <Layout>
        </Layout>
    )
}

export default withApollo({ ssr: true })(Adm)