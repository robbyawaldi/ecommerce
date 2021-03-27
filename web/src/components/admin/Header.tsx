import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import styles from '../../styles/AdmHeader.module.css'
import { Button, IconButton } from '@chakra-ui/react'
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

    return (
        <div className={styles.header}>
            <div className={styles.title}>Admin Siti Hajar</div>
            <div className={styles.dropdown}>
                {data?.me ? (
                    <button className={`${styles.profile} logout`} onClick={() => setToggle((toggle) => !toggle)}>
                        {data.me.email}
                        <div className={styles.profileAvatar}>
                        </div>
                    </button>
                ) : null}
                <div className="md:hidden flex">
                    <IconButton aria-label="user" variant="ghost" className="logout" icon={<AiOutlineUser />} onClick={() => setToggle((toggle) => !toggle)}/>
                </div>
                <div className={`${styles.dropdownContent} ${toggleDropdown ? styles.active : ''}`}>
                    <Button leftIcon={<FaDoorOpen />} isFullWidth className={`${styles.logoutButton} logout`} onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}