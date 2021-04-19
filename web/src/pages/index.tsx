import { Searchbar } from "../components/frontend/molecules/Searchbar";
import { Footer } from "../components/frontend/organisms/Footer";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <div>
      <Searchbar />
      {/* <Footer /> */}
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
