import React from 'react'
import { ImagesList } from './ImagesList';
import { IconButton } from "@chakra-ui/react"
import { Tooltip } from "@chakra-ui/react"
import { FaPen } from 'react-icons/fa'
import { FaEraser } from 'react-icons/fa'
import { useProductsQuery } from '../../generated/graphql';
import toRupiah from '@develoka/angka-rupiah-js';

interface ProductListProps { }

export const ProductList: React.FC<ProductListProps> = ({ }) => {
    const {data, error, loading } = useProductsQuery()

    if (!loading && !data) {
        return (
            <div>
                <div>you got query failed for some reason</div>
                <div>{error?.message}</div>
            </div>
        )
    }

    if (!data && loading) {
        return <div>loading...</div>
    }

    return (
        <section className="grid md:grid-cols-2 gap-2">
            {data?.products?.map(product => (
                <div key={product.id}
                    className={`bg-white w-full rounded-md shadow-lg p-5 grid grid-flow-col grid-cols-2 gap-8`}>
                    <ImagesList images={product.images.reduce<string[]>((arr, image) => {
                        return [...arr, image.image]
                    }, [])} />
                    <div className="flex flex-col">
                        <div>{product.title}</div>
                        <div className="font-bold text-sm">{toRupiah(product.price, {floatingPoint: 0})}</div>
                        <div className="flex mt-3 w-full">
                            <Tooltip label="Edit Product">
                                <IconButton
                                mr={2}
                                    colorScheme="teal"
                                    aria-label="edit product"
                                    size="sm"
                                    icon={<FaPen />}
                                />
                            </Tooltip>
                            <Tooltip label="Delete Product">
                                <IconButton
                                    colorScheme="orange"
                                    aria-label="delete product"
                                    size="sm"
                                    icon={<FaEraser />}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}