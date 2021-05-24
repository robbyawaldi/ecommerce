import { FormControl, FormLabel, IconButton, Switch, Tooltip } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import { useRouter } from 'next/router';
import React from 'react'
import { FaEraser, FaPen } from 'react-icons/fa';
import { IoBagCheckSharp } from 'react-icons/io5';
import { Product as ProductGraphql } from '../../generated/graphql';
import { calculateDiscount } from '../../utils/discount';
import { ImagesList } from './ImagesList';

interface ProductProps {
    product: ProductGraphql
    handlePublish: (id: string, isPublish: boolean) => void
}

export const Product: React.FC<ProductProps> = ({ product, handlePublish }) => {
    const router = useRouter()

    return (
        <div key={product.id}
            className={`bg-white w-full rounded-md shadow-lg p-5 grid grid-flow-col grid-cols-2 gap-8`}>
            <ImagesList
                images={product.images.reduce<string[]>((arr, image) => [...arr, image.url as string], [])} />
            <div className="flex flex-col justify-end">
                <div>{product.title}</div>
                <div className="flex items-center">
                    <IoBagCheckSharp className="mr-2" />
                    {product.stockAvailable ? 'Stock Ready' : 'Out of Stock'}
                </div>
                {
                    product.isDiscount ? (
                        <div>
                            <div className="text-xs line-through">{toRupiah(product.price, { floatingPoint: 0 })}</div>
                            <div className="font-semibold text-gold">{toRupiah(calculateDiscount({ price: product.price, discount: product.discount }), { floatingPoint: 0 })}</div>
                        </div>
                    ) : (
                        <div className="font-semibold text-gold">{toRupiah(product.price, { floatingPoint: 0 })}</div>
                    )
                }
                <div className="flex mt-3 w-full">
                    <Tooltip label="Edit Product">
                        <IconButton
                            onClick={() => router.push({
                                pathname: 'products/edit/[id]',
                                query: { id: product.id }
                            })}
                            mr={2}
                            colorScheme="teal"
                            aria-label="edit product"
                            size="sm"
                            icon={<FaPen />}
                        />
                    </Tooltip>
                    <Tooltip label="Delete Product">
                        <IconButton
                            onClick={() => router.replace({
                                pathname: router.pathname,
                                query: { delete: product.id, title: product.title }
                            })}
                            colorScheme="orange"
                            aria-label="delete product"
                            size="sm"
                            icon={<FaEraser />}
                        />
                    </Tooltip>
                </div>
                <FormControl className="flex-grow" display="flex" alignItems="flex-end">
                    <FormLabel htmlFor="email-alerts" mb="0">
                        Publish?
                    </FormLabel>
                    <Switch
                        defaultChecked={product.isPublish}
                        onChange={(e => handlePublish(product.id, e.target.checked))}
                    />
                </FormControl>
            </div>
        </div>
    );
}