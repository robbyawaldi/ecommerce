import { BackButton } from "../../../../components/admin/BackButton"
import { EditCategory } from "../../../../components/admin/EditCategory"
import { Layout } from "../../../../components/admin/Layout"
import { withApollo } from "../../../../utils/withApollo"

const Category = () => {
    return (
        <Layout>
            <BackButton />
            <EditCategory />
        </Layout>
    )
}

export default withApollo({ ssr: true })(Category)