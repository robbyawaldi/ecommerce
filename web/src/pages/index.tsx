import { Tabs } from "../components/frontend/molecules/Tabs";
import { Footer } from "../components/frontend/organisms/Footer";
import { Header } from "../components/frontend/organisms/Header";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <div>
      {/* <Tabs /> */}
      <Header />
      <main className="h-screen"></main>
      <Footer />
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
