import React from 'react'
import { Carousel as CarouselContainer } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Image from 'next/image'

export interface CarouselProps { }

export const Carousel: React.FC<CarouselProps> = ({ }) => {
    return (
        <CarouselContainer
            autoPlay
            showThumbs={false} 
            infiniteLoop={true}
            showStatus={false}
            className="mt-10">
            <div>
                <Image src="/assets/banner_1.png" className="rounded-2xl" width={878} height={175}/>
            </div>
            <div>
                <Image src="/assets/banner_2.jpg" className="rounded-2xl" width={878} height={175}/>
            </div>
            <div>
                <Image src="/assets/banner_3.jpg" className="rounded-2xl" width={878} height={175}/>
            </div>
            <div>
                <Image src="/assets/banner_4.jpg" className="rounded-2xl" width={878} height={175}/>
            </div>
        </CarouselContainer>
    );  
}