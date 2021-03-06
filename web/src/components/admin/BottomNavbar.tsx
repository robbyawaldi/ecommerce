import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { IconContext } from 'react-icons'
import { useMeQuery } from '../../generated/graphql'
import { sideBarMenu } from '../../static/sideBarMenu'

interface BottomNavbarProps { }

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ }) => {
    const router = useRouter()
    const [menu, setMenu] = React.useState(sideBarMenu)
    const { data } = useMeQuery()

    React.useEffect(() => {
        if (data?.me) {
            let menus: string[] = []
            switch (data.me.role.slug) {
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

    return (
        <div className="fixed bottom-0 z-20 w-full h-16 bg-teal-400 sm:hidden flex justify-evenly">
            {menu.map((item, index) => {
                const color = item.path === router.pathname ? 'white' : 'black'

                return (
                    <Link
                        key={index}
                        href={item.path}>
                        <div className="flex flex-col h-full justify-center items-center">
                            <IconContext.Provider value={{ color: color }}>
                                {item.icon}
                            </IconContext.Provider>
                            <div className={`text-${color}`}>
                                {item.title}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}