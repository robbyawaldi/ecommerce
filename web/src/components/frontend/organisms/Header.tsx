import React, { useEffect } from 'react'
import styles from '../../../styles/frontend/Header.module.css'
import { Searchbar } from '../molecules/Searchbar'
import { Navs } from '../molecules/Navs'
import { IconButton } from '@chakra-ui/button'
import { CgMenu } from 'react-icons/cg'
import { SideBar } from './SideBar'
import { useDisclosure } from '@chakra-ui/hooks'
import { Cart } from './Cart'
import { useRouter } from 'next/router'

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = ({ }) => {
    const disclosureCart = useDisclosure()
    const { onOpen: onOpenCart } = disclosureCart
    const disclosureSideBar = useDisclosure()
    const { onOpen: onOpenSideBar } = disclosureSideBar
    const router = useRouter()

    useEffect(() => {
        if (typeof router.query.openCart == 'string') {
            onOpenCart()
        }
    }, [router])

    useEffect(() => {
        if (!disclosureCart.isOpen) {
            const { openCart, ...query } = router.query
            router.replace({
                pathname: router.pathname,
                query: { ...query }
            })
        }
    }, [disclosureCart.isOpen])

    return (
        <header className={styles.header}>
            <img src="/assets/Logo.png" alt="logo" width="120px" />
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