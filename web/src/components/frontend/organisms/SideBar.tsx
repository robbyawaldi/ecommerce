import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    UseDisclosureReturn,
    Divider,
    DrawerHeader,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Collapse,
    useDisclosure,
    IconButton
} from '@chakra-ui/react';
import LogoWhite from '../../../assets/Logo-white.svg'
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
                        <LogoWhite />
                    </DrawerHeader>
                    <DrawerBody className={styles.body}>
                        <ul>
                            <Link href="/">
                                <li>Beranda</li>
                            </Link>
                            <li>
                                Kategori
                                <IconButton
                                    variant="ghost"
                                    aria-label="arrow"
                                    icon={<IoIosArrowDown />}
                                    onClick={onToggle} />
                                <Collapse in={isOpenCollapse}>
                                    <CategoriesSidebar />
                                </Collapse>
                            </li>
                            <Link href="/exclusive">
                                <li>Koleksi Ekslusif</li>
                            </Link>
                            <li>Tentang Siti Hajar</li>
                        </ul>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
}