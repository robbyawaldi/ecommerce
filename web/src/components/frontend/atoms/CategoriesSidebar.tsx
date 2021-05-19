import { useDisclosure } from '@chakra-ui/hooks';
import { IconButton } from '@chakra-ui/react';
import { Collapse } from '@chakra-ui/transition';
import Link from 'next/link';
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { useCategoriesQuery } from '../../../generated/graphql';
import { loadingOrQueryFailed } from '../../../utils/loadingOrQueryFailed';

interface CategoriesSidebarProps {
    onClose: () => void
}

export const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ onClose }) => {
    const { data, error, loading } = useCategoriesQuery({
        variables: {
            level: 0
        }
    })

    const errorCategoryMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorCategoryMessage) {
        return errorCategoryMessage
    }

    return (
        <div className="pl-5">
            <ul>
                {data?.categories?.map(category => {
                    const { isOpen, onToggle } = useDisclosure()

                    return (
                        <li key={category.id}>
                            {category.name}
                            <IconButton
                                _active={{
                                    bg: '#000000'
                                }}
                                _hover={{
                                    bg: '#000000'
                                }}
                                variant="ghost"
                                aria-label="arrow"
                                icon={<IoIosArrowDown />}
                                onClick={onToggle} />

                            <Collapse in={isOpen}>
                                <ul className="pl-6">
                                    {category.child?.map(category => (
                                        <Link key={category.id} href={{
                                            pathname: '/categories',
                                            query: {
                                                id: category.id
                                            }
                                        }}>
                                            <li onClick={onClose}>{category.name}</li>
                                        </Link>
                                    ))}
                                </ul>
                            </Collapse>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}