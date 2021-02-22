import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <Layout>
      hello world
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
