import React from 'react'
import styles from '../../../styles/frontend/Header.module.css'
import Logo from '../../../assets/Logo.svg'
import Line from '../../../assets/Line.svg'
import ShoppingCart from '../../../assets/ShoppingCart.svg'
import { Searchbar } from '../molecules/Searchbar'
import { Tabs } from '../molecules/Tabs'

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
        return (
            <header className={styles.header}>
                <Logo />
                <Searchbar />
                <Line />
                <ShoppingCart />
                <Tabs />
            </header>
        );
}