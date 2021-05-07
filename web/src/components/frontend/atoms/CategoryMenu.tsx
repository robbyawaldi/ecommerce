import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import { MenuDivider, MenuGroup, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'
import { useCategoriesQuery } from '../../../generated/graphql';
import styles from '../../../styles/frontend/CategoryMenu.module.css'
import { loadingOrQueryFailed } from '../../../utils/loadingOrQueryFailed';

interface CategoryMenuProps { }

export const CategoryMenu: React.FC<CategoryMenuProps> = () => {
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
        <Menu>
            <MenuButton className={styles.button}>Kategori</MenuButton>
            <MenuList>
                {data?.categories?.map(category => (
                    <React.Fragment key={category.id}>
                        <MenuGroup title={category.name} className="cursor-default">
                            {category.child?.map(category => (
                                <Link key={category.id} href={{
                                    pathname: '/categories',
                                    query: {
                                        id: category.id
                                    }
                                }}>
                                    <MenuItem>{category.name}</MenuItem>
                                </Link>
                            ))}
                        </MenuGroup>
                        <MenuDivider />
                    </React.Fragment>
                ))}
            </MenuList>
        </Menu>
    );
}