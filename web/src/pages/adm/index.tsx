import { AdmLayout } from "../../components/AdmLayout"
import { withApollo } from "../../utils/withApollo"

const Adm = () => {
    return (
        <AdmLayout>
            <h1>helllo world</h1>
        </AdmLayout>
    )
}

export default withApollo({ ssr: true })(Adm)