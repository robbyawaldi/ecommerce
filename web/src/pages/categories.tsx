import { Filter } from "../components/frontend/molecules/Filter"
import { Gallery } from "../components/frontend/molecules/Gallery"
import { Sort } from "../components/frontend/molecules/Sort"
import { Layouts } from "../components/frontend/templates/Layouts"
import { withApollo } from "../utils/withApollo"

const Categories = () => {
    return (
        <Layouts>
            <div className="flex mt-10">
                <div className="mr-10">
                    <Filter />
                    <Sort />
                </div>
                <Gallery />
            </div>
        </Layouts>
    )
}

export default withApollo({ ssr: true })(Categories)