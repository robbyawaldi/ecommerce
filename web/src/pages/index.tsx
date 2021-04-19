import { Footer } from "../components/frontend/organisms/Footer";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <div>
      <Footer />
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
