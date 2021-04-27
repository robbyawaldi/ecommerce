import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import { MenuDivider, MenuGroup, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'
import styles from '../../../styles/frontend/CategoryMenu.module.css'

interface CategoryMenuProps { }

export const CategoryMenu: React.FC<CategoryMenuProps> = () => {
    return (
        <Menu>
            <MenuButton className={styles.button}>Kategori</MenuButton>
            <MenuList>
                <MenuGroup title="Pakaian" className="cursor-default">
                    <Link href={{
                        pathname: '/categories'
                    }}>
                    <MenuItem>Gamis</MenuItem>
                    </Link>
                    <MenuItem>Tunik</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Kerudung">
                    <MenuItem>Bergo</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
}