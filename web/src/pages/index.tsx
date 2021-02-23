import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <>
      hello world
    </>
  );
};

export default withApollo({ ssr: true })(Index);
