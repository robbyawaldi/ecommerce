import { Carousel } from "../components/frontend/atoms/Carousel";
import { Gallery } from "../components/frontend/molecules/Gallery";
import { Footer } from "../components/frontend/organisms/Footer";
import { Header } from "../components/frontend/organisms/Header";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <div>
      <Header />
      <main className="md:px-24 px-4">
        <Carousel />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
