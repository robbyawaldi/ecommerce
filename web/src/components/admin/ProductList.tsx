import React from 'react'
import { ImagesList } from './ImagesList';

const products = [
    {
        id: "sdDFSD",
        image: "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/373935/smaller_ALMAS_Pashmina-Dark_Olive_1.jpg",
        images: [
            "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/373935/smaller_ALMAS_Pashmina-Dark_Olive_1.jpg",
            "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/373936/big_ALMAS_Pashmina-Dark_Olive_2.jpg",
            "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/373937/big_ALMAS_Pashmina-Dark_Olive_3.jpg"
        ],
        title: "ALMAS Pashmina Dark Olive",
        price: "Rp85.000"
    },
    {
        id: "skdfLSKD",
        image: "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/375843/smaller_177533.jpg",
        images: [
            "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/375843/smaller_177533.jpg",
            "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/375844/big_177533-2.jpg",
            "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/375845/big_177533-3.jpg"
        ],
        title: "Deliciosa Tunik",
        price: "Rp283.500"
    },
    {
        id: "sjkadfj",
        image: "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/375907/smaller_177380.jpg",
        images: [
            "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/375907/smaller_177380.jpg",
            "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/375908/big_177380-6.jpg",
            "https://storage.googleapis.com/hijup-production-sg-core/system/product_image/image/375909/big_177380-2.jpg"
        ],
        title: "Adenium Shirt",
        price: "Rp295.000"
    },
   
]

interface ProductListProps { }

export const ProductList: React.FC<ProductListProps> = ({ }) => {
    return (
        <section className="grid md:grid-cols-2 gap-2 mt-5">
            {products.map(product => (
                <div key={product.id} className={`bg-white w-full rounded-md shadow-lg p-5 flex`}>
                    <ImagesList images={product.images}/>
                    <div className="flex flex-col ml-5 h-16 justify-between">
                        <div>{product.title}</div>
                        <div className="font-bold text-sm">{product.price}</div>
                    </div>
                </div>
            ))}
        </section>
    );
}