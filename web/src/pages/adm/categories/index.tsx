import { CategoryList } from "../../../components/admin/CategoryList"
import { CreateCategory } from "../../../components/admin/CreateCategory"
import { Layout } from "../../../components/admin/Layout"
import { useIsAuth } from "../../../utils/useIsAuth"
import { withApollo } from "../../../utils/withApollo"

const Categories = () => {
    useIsAuth()

    return (
        <Layout>
            <h1 className="font-semibold text-lg">Categories Management</h1>
            <div className="flex md:flex-row flex-col">
                <div className="flex w-full max-h-72 md:mr-1 mr-0">
                    <CreateCategory />
                </div>
                <CategoryList />
            </div>
        </Layout>
    )
}

export default withApollo({ ssr: true })(Categories)