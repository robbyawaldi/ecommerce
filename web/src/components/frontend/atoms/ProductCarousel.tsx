import React from 'react'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

interface ProductCarouselProps { }

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ }) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <Carousel responsive={responsive} infinite>
            <img src="/assets/product_sample.png" />
            <img src="/assets/product_sample.png" />
            <img src="/assets/product_sample.png" />
            <img src="/assets/product_sample.png" />
        </Carousel>
    );
}