import { Table, Thead, Tr, Th, Tbody } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { ModalConfirm } from './ModalConfirm';
import card from '../../styles/Card.module.css'
import { CategoriesDocument, Category, useCategoriesQuery, useDeleteCategoryMutation } from '../../generated/graphql';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import { CategoryTableRow } from './CategoryTableRow';

interface CategoryListProps { }

export const CategoryList: React.FC<CategoryListProps> = ({ }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const { data, error, loading } = useCategoriesQuery({
        variables: {
            level: 0
        }
    })
    const [deleteCategory] = useDeleteCategoryMutation()
    const router = useRouter()

    useEffect(() => {
        if (typeof router.query.delete == 'string') {
            setOpenDeleteModal(true)
        }
    }, [router.query.delete])

    const handleDelete = useCallback(async () => {
        const response = await deleteCategory({
            variables: { id: parseInt(router.query.delete as string) },
            refetchQueries: [
                {
                    query: CategoriesDocument,
                    variables: {
                        level: 0
                    }
                }
            ]
        })
        if (response.data?.deleteCategory) handleClose()
    }, [router.query.delete])

    const handleClose = useCallback(() => {
        setOpenDeleteModal(false)
        delete router.query.delete
        delete router.query.name
        router.replace({
            pathname: router.pathname,
            query: { ...router.query }
        })
    }, [router.query])

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) return errorMessage

    return (
        <section className={card.box}>
            <h1 className={card.title}>Categories</h1>
            <div className="overflow-x-auto">
                <Table variant="simple" mt={3}>
                    <Thead>
                        <Tr>
                            <Th colSpan={2}>Name</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.categories?.map((category) => (
                            <CategoryTableRow 
                                key={category.id} 
                                category={category as Category} />
                        ))}
                    </Tbody>
                </Table>
            </div>
            <ModalConfirm
                title="Delete User"
                isOpen={openDeleteModal}
                onAccept={handleDelete}
                onClose={handleClose}>
                <p>
                    Are you sure to delete {router.query.name}
                </p>
            </ModalConfirm>
        </section>
    );
}