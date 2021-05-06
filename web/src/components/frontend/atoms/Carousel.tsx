import React from 'react'
import { Carousel as CarouselContainer } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

interface CarouselProps { }

export const Carousel: React.FC<CarouselProps> = ({ }) => {
    return (
        <CarouselContainer
            autoPlay
            showThumbs={false} 
            infiniteLoop={true}
            showStatus={false}
            className="mt-10">
            <div>
                <img src="/assets/slide1.svg" className="rounded-2xl"/>
            </div>
            <div>
                <img src="/assets/slide2.svg" className="rounded-2xl"/>
            </div>
            <div>
                <img src="/assets/slide3.svg" className="rounded-2xl"/>
            </div>
        </CarouselContainer>
    );  
}