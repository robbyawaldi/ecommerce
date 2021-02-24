import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <div>
      hello world
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
