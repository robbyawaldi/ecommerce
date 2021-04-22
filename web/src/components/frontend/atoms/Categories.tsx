import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import { MenuDivider, MenuGroup, MenuItem } from '@chakra-ui/react';
import React from 'react'
import styles from '../../../styles/frontend/Categories.module.css'

interface CategoriesProps { }

export const Categories: React.FC<CategoriesProps> = () => {
    return (
        <Menu>
            <MenuButton className={styles.button}>Kategori</MenuButton>
            <MenuList>
                <MenuGroup title="Pakaian" className="cursor-default">
                    <MenuItem>Gamis</MenuItem>
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