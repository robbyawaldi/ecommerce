import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { sideBarMenu } from '../../static/sideBarMenu'
import { FaChevronLeft, FaDev } from 'react-icons/fa'
import useDidMountEffect from '../../utils/useDidMountEffect'
import { useMeQuery } from '../../generated/graphql'
import styles from '../../styles/AdmSidebar.module.css'

interface SideBarProps {}

export const SideBar: React.FC<SideBarProps> = ({ }) => {
    const router = useRouter()
    const [minimize, setMinimize] = useState(typeof router.query.s == 'string')
    const [menu, setMenu] = useState(sideBarMenu)
    const { data } = useMeQuery()
    
    useEffect(() => {
        if (data?.me) {
            let menus: string[] = []
            switch(data.me.role.slug) {
                case "admin":
                    menus = ['user', 'product']
                    setMenu(sideBarMenu.filter(menu => menus.includes(menu.slug)))
                    break
                case "data_entry": 
                    menus = ['product']
                    setMenu(sideBarMenu.filter(menu => menus.includes(menu.slug)))
                    break
            }
        }
    }, [data?.me])

    useDidMountEffect(() => {
        const { s, ...query } = router.query

        if (minimize) router.push({
            pathname: router.pathname,
            query: { ...query, s: '' }
        })
        else router.push({
            pathname: router.pathname,
            query: { ...query }
        })
    }, [minimize])

    const handleMinimize = () => setMinimize(prev => !prev)

    return (
        <nav className={`${styles.sidebar} ${minimize ? 'w-16' : 'md:w-1/6 w-16'}`}>
            <div className={styles.logo}>
                <FaDev />
            </div>
            <ul className="flex-grow">
                {menu.map((item, index) => (
                    <li key={index}>
                        <Link href={`${item.path}${minimize ? '?minimize' : ''}`}>
                            <div className={`${styles.menu} ${item.path == router.pathname ? 'bg-teal-400' : ''}`}>
                                <div className="flex-none">
                                    {item.icon}
                                </div>
                                <span className={`${styles.titleMenu} ${minimize ? 'opacity-0' : 'md:opacity-100 opacity-0'}`}>{item.title}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div onClick={handleMinimize} className={styles.sideButton}>
                <FaChevronLeft className={`transition duration-300 ${minimize ? 'transform rotate-180' : ''}`} />
            </div>
        </nav>
    );
}