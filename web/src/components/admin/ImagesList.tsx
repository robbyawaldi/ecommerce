import React from 'react'
import styles from '../../styles/ImagesList.module.css'

interface ImagesListProps {
    images: string[]
}

export const ImagesList: React.FC<ImagesListProps> = ({ images }) => {
    return (
        <div className="relative w-8/12">
            <div className={`flex overflow-x-hidden w-full`}>
                {
                    images.map((image: string, index) => (
                        <img key={index} className="rounded-md mr-3 w-32" src={image} />
                    ))
                }
            </div>
            <button className={`${styles.nextButton} focus:outline-none`}>next</button>
        </div>
    );
}