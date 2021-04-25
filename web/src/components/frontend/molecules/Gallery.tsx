import React from 'react'
import { Card } from '../atoms/Card'

interface GalleryProps {}

export const Gallery: React.FC<GalleryProps> = ({}) => {
        return (
            <div className="h-auto grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
                    <Card />
                ))}
            </div>
        );
}