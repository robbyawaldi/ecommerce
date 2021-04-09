import { AddSubCategory } from "../../../../components/admin/AddSubCategory"
import { BackButton } from "../../../../components/admin/BackButton"
import { Layout } from "../../../../components/admin/Layout"
import { withApollo } from "../../../../utils/withApollo"


const AddSub = () => {
    return (
        <Layout>
            <BackButton />
            <AddSubCategory />
        </Layout>
    )
}

export default withApollo({ ssr: true })(AddSub)