import { Layout } from "../../components/admin/Layout"
import { useIsAuth } from "../../utils/useIsAuth"
import { withApollo } from "../../utils/withApollo"

const Adm = () => {
    useIsAuth()

    return (
        <Layout>
            <h1>helllo world</h1>
        </Layout>
    )
}

export default withApollo({ ssr: true })(Adm)