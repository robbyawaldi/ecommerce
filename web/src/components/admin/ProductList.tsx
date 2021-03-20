import React, { useCallback, useEffect, useState } from 'react'
import { ImagesList } from './ImagesList';
import { IconButton } from "@chakra-ui/react"
import { Tooltip } from "@chakra-ui/react"
import { FaPen } from 'react-icons/fa'
import { FaEraser } from 'react-icons/fa'
import { ProductsDocument, useDeleteProductMutation, useProductsQuery } from '../../generated/graphql';
import toRupiah from '@develoka/angka-rupiah-js';
import { ModalConfirm } from './ModalConfirm';
import { useRouter } from 'next/router';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import { IoBagCheckSharp } from 'react-icons/io5'

interface ProductListProps { }

export const ProductList: React.FC<ProductListProps> = ({ }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const { data, error, loading } = useProductsQuery()
    const [deleteProduct] = useDeleteProductMutation()
    const router = useRouter()
    const id = router.query.delete as string

    useEffect(() => {
        if (typeof router.query.delete == 'string') {
            setOpenDeleteModal(true)
        }
    }, [router.query.delete])

    const handleDelete = useCallback(async () => {
        const response = await deleteProduct({
            variables: { id },
            update: (cache) => {
                cache.evict({ id: "Product:" + id })
            }
        })

        if (response.data?.deleteProduct) {
            handleClose()
        }
    }, [router.query.delete])

    const handleClose = useCallback(() => {
        setOpenDeleteModal(false)
        router.replace({
            pathname: router.pathname
        })
    }, [])

    const errorMessage = loadingOrQueryFailed(data, loading, error)
    if (errorMessage) {
        return errorMessage
    }

    return (
        <section >
            <div className="grid md:grid-cols-2 gap-2">
                {data?.products?.map(product => (
                    <div key={product.id}
                        className={`bg-white w-full rounded-md shadow-lg p-5 grid grid-flow-col grid-cols-2 gap-8`}>
                        <ImagesList
                            images={product.images.reduce<string[]>((arr, image) => [...arr, image.url as string], [])} />
                        <div className="flex flex-col">
                            <div>{product.title}</div>
                            <div className="flex items-center">
                                <IoBagCheckSharp className="mr-2" />
                                {product.stockAvailable ? 'Stock Ready' : 'Out of Stock'}
                            </div>
                            <div className="font-bold text-sm">{toRupiah(product.price, { floatingPoint: 0 })}</div>
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
                        </div>
                    </div>
                ))}
            </div>

            <ModalConfirm
                title="Delete Product"
                isOpen={openDeleteModal}
                onAccept={handleDelete}
                onClose={handleClose}>
                <p>
                    Are you sure to delete {router.query.title}
                </p>
            </ModalConfirm>
        </section>
    );
}