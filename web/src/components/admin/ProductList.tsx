import React, { useCallback, useEffect, useState } from 'react'
import { ImagesList } from './ImagesList';
import { FaPen } from 'react-icons/fa'
import { FaEraser } from 'react-icons/fa'
import { useDeleteProductMutation, useProductsQuery, useUpdateProductPublishMutation } from '../../generated/graphql';
import toRupiah from '@develoka/angka-rupiah-js';
import { ModalConfirm } from './ModalConfirm';
import { useRouter } from 'next/router';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import { IoBagCheckSharp } from 'react-icons/io5'
import { FormControl, FormLabel, IconButton, Switch, Tooltip } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import paginate from '../../styles/Paginate.module.css'
import { LIMIT_PAGE_ADMIN } from '../../static/products';

interface ProductListProps { }

export const ProductList: React.FC<ProductListProps> = ({ }) => {
    const router = useRouter()
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const { data, error, loading, refetch } = useProductsQuery({
        variables: {
            page: 1,
            limit: LIMIT_PAGE_ADMIN,
            categoryId: parseInt(router.query.fc as string) ?? 0,
            isAdmin: true
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true
    })
    const [deleteProduct] = useDeleteProductMutation()
    const [updateProductPublish] = useUpdateProductPublishMutation()
    const id = router.query.delete as string
    const totalPage = Math.ceil((data?.products?.meta?.total ?? 0) / LIMIT_PAGE_ADMIN)

    useEffect(() => {
        if (typeof router.query.delete == 'string') {
            setOpenDeleteModal(true)
        }
    }, [router.query.delete])

    const handleDelete = useCallback(async () => {
        const response = await deleteProduct({
            variables: { id }
        })

        if (response.data?.deleteProduct) {
            refetch({
                categoryId: parseInt(router.query.fc as string)
            })
            handleModalClose()
        }
    }, [router.query.delete])

    const handlePublish = async (id: string, isPublish: boolean) => {
        await updateProductPublish({
            variables: { id, isPublish }
        })
    }

    const handleModalClose = useCallback(() => {
        setOpenDeleteModal(false)
        router.replace({
            pathname: router.pathname
        })
    }, [])

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) {
        return errorMessage
    }

    return (
        <section >
            <div className="grid md:grid-cols-2 gap-2">
                {data?.products?.products.map(product => (
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
                ))}
            </div>
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                breakLabel={'..'}
                pageCount={totalPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => {
                    refetch({
                        page: selected + 1
                    })
                }}
                containerClassName={paginate.pagination}
                activeClassName={paginate.pagination__link_active}
                previousClassName={`${paginate.pagination_nav} ${paginate.pagination_prev}`}
                nextClassName={`${paginate.pagination_nav} ${paginate.pagination_next}`}
            />

            <ModalConfirm
                title="Delete Product"
                isOpen={openDeleteModal}
                onAccept={handleDelete}
                onClose={handleModalClose}>
                <p>
                    Are you sure to delete {router.query.title}
                </p>
            </ModalConfirm>
        </section>
    );
}