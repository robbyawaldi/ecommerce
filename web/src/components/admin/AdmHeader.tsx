import { useRouter } from 'next/router';
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import styles from '../../styles/AdmHeader.module.css'
import { Button } from '@chakra-ui/react'
import { FaDoorOpen } from 'react-icons/fa'

interface AdmHeaderProps { }

export const AdmHeader: React.FC<AdmHeaderProps> = ({ }) => {
    const { data } = useMeQuery()
    const [logout] = useLogoutMutation()
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.replace('/adm/login')
    }

    return (
        <div className={styles.header}>
            <div className={styles.title}>Admin Siti Hajar</div>
            <div className={styles.dropdown}>
                {data?.me ? (
                    <button className={styles.profile}>
                        {data.me.email}
                        <div className={styles.profileAvatar}>
                        </div>
                    </button>
                ) : null}
                <div className={styles.dropdownContent}>
                    <Button leftIcon={<FaDoorOpen />} isFullWidth className={styles.logoutButton} onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}