import { AdmLayout } from "../../components/AdmLayout"
import { useIsAuth } from "../../utils/useIsAuth"
import { withApollo } from "../../utils/withApollo"

const Adm = () => {
    useIsAuth()

    return (
        <AdmLayout>
            <h1>helllo world</h1>
        </AdmLayout>
    )
}

export default withApollo({ ssr: true })(Adm)