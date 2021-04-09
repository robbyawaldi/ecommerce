import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { ModalConfirm } from './ModalConfirm';
import card from '../../styles/Card.module.css'
import { CategoriesDocument, useCategoriesQuery, useDeleteCategoryMutation } from '../../generated/graphql';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';

interface CategoryListProps { }

export const CategoryList: React.FC<CategoryListProps> = ({ }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const { data, error, loading } = useCategoriesQuery()
    const [deleteCategory] = useDeleteCategoryMutation()
    const router = useRouter()

    useEffect(() => {
        console.log(router.query)
        if (typeof router.query.delete == 'string') {
            setOpenDeleteModal(true)
        }
    }, [router.query.delete])

    const handleDelete = useCallback(async () => {
        const response = await deleteCategory({
            variables: { id: parseInt(router.query.delete as string) },
            refetchQueries: [
                {
                    query: CategoriesDocument
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
            query: { ...router.query}
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
                            <Th>Name</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.categories?.map((category) => (
                            <Tr key={category.id}>
                                <Td>
                                    <Link href={{
                                        pathname: '/adm/categories/edit/[id]',
                                        query: { id: category.id }
                                    }}>
                                        <span className="font-semibold cursor-pointer">
                                            {category.name}
                                        </span>
                                    </Link>
                                </Td>
                                <Td className="space-x-3">
                                    <Link href={{
                                        pathname: '/adm/categories/edit/[id]',
                                        query: { ...router.query, id: category.id }
                                    }}>
                                        <a className="font-semibold">Edit</a>
                                    </Link>
                                    <Link href={{
                                        pathname: '/adm/categories/add-sub/[id]',
                                        query: { ...router.query, id: category.id }
                                    }}>
                                        <a className="font-semibold">Add Sub</a>
                                    </Link>
                                    <Link href={{
                                        pathname: '/adm/categories',
                                        query: { ...router.query, delete: category.id, name: category.name }
                                    }}>
                                        <a className="font-semibold">Delete</a>
                                    </Link>
                                </Td>
                            </Tr>
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