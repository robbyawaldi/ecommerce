import React from 'react'
import styles from '../../../styles/frontend/Header.module.css'
import { IconButton } from '@chakra-ui/button'
import { CgMenu } from 'react-icons/cg'
import { useDisclosure } from '@chakra-ui/hooks'
import dynamic from 'next/dynamic'
import { CartProps } from './Cart'
import { SearchbarProps } from '../molecules/Searchbar'
import { NavsProps } from '../molecules/Navs'
const Searchbar = dynamic(() => import('../molecules/Searchbar').then((component) => component.Searchbar as any)) as React.ComponentType<SearchbarProps>
const Cart = dynamic(() => import('./Cart').then((component) => component.Cart as any)) as React.ComponentType<CartProps>
const SideBar = dynamic(() => import('./SideBar').then((component) => component.SideBar as any)) as React.ComponentType<CartProps>
const Navs = dynamic(() => import('../molecules/Navs').then((component) => component.Navs as any)) as React.ComponentType<NavsProps>

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = ({ }) => {
    const disclosureCart = useDisclosure()
    const { onOpen: onOpenCart } = disclosureCart
    const disclosureSideBar = useDisclosure()
    const { onOpen: onOpenSideBar } = disclosureSideBar

    return (
        <header className={styles.header}>
            <a href="/">
                <img src="/assets/Logo_black.png" alt="logo" width="120px" />
            </a>
            <Searchbar />
            <img src="/assets/line.svg" alt="line" />
            <img src="/assets/shoppingcart.svg" alt="shopping icon" onClick={onOpenCart} />
            <Navs />
            <IconButton variant="ghost" size="xs" icon={<CgMenu size={24} />} aria-label="menu" onClick={onOpenSideBar} />
            <Cart disclosure={disclosureCart} />
            <SideBar disclosure={disclosureSideBar} />
        </header>
    );
}