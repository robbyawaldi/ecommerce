import React from 'react'
import styles from '../../../styles/frontend/Header.module.css'
import Logo from '../../../assets/Logo.svg'
import Line from '../../../assets/Line.svg'
import ShoppingCart from '../../../assets/ShoppingCart.svg'
import { Searchbar } from '../molecules/Searchbar'
import { Tabs } from '../molecules/Tabs'
import { IconButton } from '@chakra-ui/button'
import { CgMenu } from 'react-icons/cg'

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = ({ }) => {
    return (
        <header className={styles.header}>
            <Logo />
            <Searchbar />
            <Line />
            <ShoppingCart onClick={() => console.log('test')} />
            <Tabs />
            <IconButton size="xs" icon={<CgMenu size={24}/>} aria-label="menu" />
        </header>
    );
}