import React from 'react'
import { Card } from './Card'

interface GalleryProps {}

export const Gallery: React.FC<GalleryProps> = ({}) => {
        return (
            <div className="h-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Card key={i}/>
                ))}
            </div>
        );
}