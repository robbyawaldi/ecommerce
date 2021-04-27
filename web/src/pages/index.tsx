import { Carousel } from "../components/frontend/atoms/Carousel";
import { Gallery } from "../components/frontend/molecules/Gallery";
import { Layouts } from "../components/frontend/templates/Layouts";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <Layouts>
      <Carousel />
      <h1 className="text-center text-2xl my-12">KOLEKSI TERBARU</h1>
      <Gallery />
    </Layouts>
  );
};

export default withApollo({ ssr: true })(Index);
