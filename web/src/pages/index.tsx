import { Carousel } from "../components/frontend/atoms/Carousel";
import { Filter } from "../components/frontend/molecules/Filter";
import { Gallery } from "../components/frontend/molecules/Gallery";
import { ProductCard } from "../components/frontend/molecules/ProductCard";
import { ProductDetail } from "../components/frontend/molecules/ProductDetail";
import { Sort } from "../components/frontend/molecules/Sort";
import { Footer } from "../components/frontend/organisms/Footer";
import { Header } from "../components/frontend/organisms/Header";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <div>
      <Header />
      <main className="md:px-24 px-4">
        <Filter />
        <Sort />
        {/* <ProductCard /> */}
        {/* <ProductDetail /> */}
        {/* <Carousel /> */}
        {/* <h1 className="text-center bold text-2xl my-6">KOLEKSI TERBARU</h1> */}
        {/* <Gallery /> */}
      </main>
      <Footer />
    </div>
  );
};

export default withApollo({ ssr: true })(Index);
