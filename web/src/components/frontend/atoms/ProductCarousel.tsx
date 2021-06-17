import React from 'react'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Image } from '../../../generated/graphql';

interface ProductCarouselProps { 
    images: Image[] | undefined
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1500 },
            items: 2
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
    };

    return (
        <Carousel responsive={responsive} infinite>
            {images?.map((image: Image) => (
                <img 
                    key={image.sequence} 
                    src={image.url} 
                    className="rounded-2xl object-cover w-full h-auto p-1 box-border"
                />
            ))}
        </Carousel>
    );
}