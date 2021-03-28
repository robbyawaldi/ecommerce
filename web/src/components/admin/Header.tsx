import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react'
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import styles from '../../styles/AdmHeader.module.css'
import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { FaDoorOpen } from 'react-icons/fa'
import { AiOutlineUser } from 'react-icons/ai'

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = ({ }) => {
    const { data } = useMeQuery()
    const [logout] = useLogoutMutation()
    const router = useRouter()
    const [toggleDropdown, setToggle] = useState(false)

    const handleLogout = async () => {
        await logout()
        router.replace('/adm/login')
    }

    useEffect(() => {
        document.body.addEventListener('mousedown', (e: MouseEvent) => {
            if (!(e.target as HTMLInputElement).classList.contains('logout') && toggleDropdown) setToggle(() => false)
        }, false)
    }, [toggleDropdown])

    const menuList = useMemo(() => (
        <MenuList>
            <MenuItem icon={<FaDoorOpen />} onClick={handleLogout}>
                Logout
            </MenuItem>
        </MenuList>
    ), [])

    return (
        <div className={styles.header}>
            <div className={styles.title}>Admin Siti Hajar</div>
            <div className="md:flex hidden">
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                isActive={isOpen}
                                as={Button}
                                variant="ghost"
                                rightIcon={<div className={styles.profileAvatar} />}>
                                {data?.me ? data.me.email : null}
                            </MenuButton>
                            {menuList}
                        </>
                    )}
                </Menu>
            </div>
            <div className="md:hidden flex">
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                className="hidden"
                                isActive={isOpen}
                                as={IconButton}
                                icon={<AiOutlineUser />}
                                variant="ghost">
                            </MenuButton>
                            {menuList}
                        </>
                    )}
                </Menu>
            </div>
        </div>
    );
}