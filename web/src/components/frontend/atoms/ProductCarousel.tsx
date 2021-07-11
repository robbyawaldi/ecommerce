import React, { useContext, useMemo } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { DetailContext } from '../../../contexts/DetailContext';
import { Image } from '../../../generated/graphql';

interface ProductCarouselProps {
    images: Image[] | undefined
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
    const { productDetail: { color } } = useContext(DetailContext)

    const responsive = useMemo(() => ({
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1500 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 1500, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }), []);

    return (
        <Carousel responsive={responsive} infinite>
            {images?.filter((image) => color == "" ? true : image.color == color).map((image: Image) => (
                <div style={{ touchAction: "none" }} key={image.sequence}>
                    <InnerImageZoom
                        className="rounded-2xl"
                        src={image.url}
                        zoomSrc={image.url}
                        hideHint={true} />
                </div>
            ))}
        </Carousel>
    );
}