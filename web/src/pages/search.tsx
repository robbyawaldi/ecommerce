import { Gallery } from "../components/frontend/molecules/Gallery"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"

const Search = () => {
    return (
        <Layouts>
            <div className="mt-5">
            <Gallery />
            </div>
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Search)