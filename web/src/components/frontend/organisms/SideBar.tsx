import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    UseDisclosureReturn,
    DrawerHeader,
    Collapse,
    useDisclosure,
    IconButton
} from '@chakra-ui/react';
import styles from '../../../styles/frontend/SideBar.module.css'
import React from 'react'
import { CategoriesSidebar } from '../atoms/CategoriesSidebar';
import { IoIosArrowDown } from 'react-icons/io'
import Link from 'next/link';

interface SideBarProps {
    disclosure: UseDisclosureReturn,
}

export const SideBar: React.FC<SideBarProps> = ({ disclosure: { isOpen, onClose } }) => {
    const { isOpen: isOpenCollapse, onToggle } = useDisclosure()

    return (
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
        >
            <DrawerOverlay>
                <DrawerContent bgColor="black" color="white">
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="2px" className={styles.header}>
                        <img src="/assets/logo-white.svg" alt="logo white" />
                    </DrawerHeader>
                    <DrawerBody className={styles.body}>
                        <ul>
                            <Link href="/">
                                <li>Beranda</li>
                            </Link>
                            <li>
                                Kategori
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
                                <Collapse in={isOpenCollapse}>
                                    <CategoriesSidebar onClose={onClose} />
                                </Collapse>
                            </li>
                            <Link href="/exclusive">
                                <li>Koleksi Ekslusif</li>
                            </Link>
                            <Link href="/malikha-indonesia">
                                <li>Malikha Indonesia</li>
                            </Link>
                            <Link href="/about">
                                <li>Tentang Siti Hajar</li>
                            </Link>
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
}