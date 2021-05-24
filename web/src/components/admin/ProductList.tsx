import React, { useCallback, useEffect, useState } from 'react'
import { Product as ProductGraphql, useDeleteProductMutation, useProductsQuery, useUpdateProductPublishMutation } from '../../generated/graphql';
import { ModalConfirm } from './ModalConfirm';
import { useRouter } from 'next/router';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import ReactPaginate from 'react-paginate';
import paginate from '../../styles/Paginate.module.css'
import { LIMIT_PAGE_ADMIN } from '../../static/products';
import { Product } from './Product';

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
                    <Product
                        key={product.id}
                        product={product as ProductGraphql}
                        handlePublish={handlePublish}
                    />
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