import { BackButton } from "../../../../components/admin/BackButton"
import { Layout } from "../../../../components/admin/Layout"
import { withApollo } from "../../../../utils/withApollo"

const Category = () => {
    return (
        <Layout>
            <BackButton />
        </Layout>
    )
}

export default withApollo({ ssr: true })(Category)