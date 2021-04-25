import React from 'react'
import styles from '../../../styles/frontend/Header.module.css'
import Line from '../../../assets/Line.svg'
import ShoppingCart from '../../../assets/ShoppingCart.svg'
import { Searchbar } from '../molecules/Searchbar'
import { Tabs } from '../molecules/Tabs'
import { IconButton } from '@chakra-ui/button'
import { CgMenu } from 'react-icons/cg'
import { SideBar } from './SideBar'
import { useDisclosure } from '@chakra-ui/hooks'

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = ({ }) => {
    const disclosure = useDisclosure()
    const { onOpen } = disclosure

    return (
        <header className={styles.header}>
            <img src="/assets/Logo.png" width="120px" />
            <Searchbar />
            <Line />
            <ShoppingCart onClick={() => console.log('test')} />
            <Tabs />
            <IconButton size="xs" icon={<CgMenu size={24} />} aria-label="menu" onClick={onOpen} />
            <SideBar disclosure={disclosure} />
        </header>
    );
}