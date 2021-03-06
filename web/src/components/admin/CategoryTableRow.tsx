import { Tr, Td, Tooltip, IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Category } from '../../generated/graphql'
import { BiAddToQueue } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'

interface CategoryTableRowProps {
    category: Category;
    sequence?: number;
}

export const CategoryTableRow: React.FC<CategoryTableRowProps> = ({ category, sequence }) => {
    const router = useRouter()

    return (
        <>
            <Tr>
                <Td colSpan={sequence ? 1 : 2}>
                    <Link href={{
                        pathname: '/adm/categories/edit/[id]',
                        query: { id: category.id }
                    }}>
                        <span className="font-semibold cursor-pointer">
                            {sequence ? sequence : category.name}
                        </span>
                    </Link>
                </Td>
                {sequence
                    ? (
                        <Td>
                            <Link href={{
                                pathname: '/adm/categories/edit/[id]',
                                query: { id: category.id }
                            }}>
                                <span className="cursor-pointer">
                                    {category.name}
                                </span>
                            </Link>
                        </Td>
                    ) : null}
                <Td className="space-x-3 flex">
                    <Tooltip label="Edit Category">
                        <IconButton
                            aria-label="edit category"
                            variant="ghost"
                            icon={<FiEdit />}
                            onClick={() => {
                                router.push({
                                    pathname: '/adm/categories/edit/[id]',
                                    query: { ...router.query, id: category.id }
                                })
                            }}
                        />
                    </Tooltip>
                    {!sequence
                        ? (
                            <Tooltip label="Add Sub Category">
                                <IconButton
                                    aria-label="add sub"
                                    variant="ghost"
                                    icon={<BiAddToQueue />}
                                    onClick={() => {
                                        router.push({
                                            pathname: '/adm/categories/add-sub/[id]',
                                            query: { ...router.query, id: category.id }
                                        })
                                    }}
                                />
                            </Tooltip>
                        ) : null}
                    {sequence || (category.child?.length || 0) < 1
                        ? (
                            <Tooltip label="Delete Category">
                                <IconButton
                                    aria-label="delete category"
                                    variant="ghost"
                                    icon={<MdDeleteForever />}
                                    onClick={() => {
                                        router.push({
                                            pathname: '/adm/categories',
                                            query: { ...router.query, delete: category.id, name: category.name }
                                        })
                                    }}
                                />
                            </Tooltip>
                        ) : null}
                </Td>
            </Tr>
            {
                category.child?.map((child, sequence) => (
                    <CategoryTableRow key={child.id} category={child} sequence={sequence + 1} />
                ))
            }
        </>
    );
}