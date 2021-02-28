import { useRouter } from 'next/router';
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import styles from '../../styles/AdmHeader.module.css'

interface AdmHeaderProps {}

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
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}