import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { sideBarMenu } from '../static/sideBarMenu'
import { FaChevronLeft, FaDev } from 'react-icons/fa'


interface SideBarProps {
}

export const SideBar: React.FC<SideBarProps> = ({ }) => {
    const router = useRouter()
    const [minimize, setMinimize] = React.useState(typeof router.query.minimize == 'string')

    const handleMinimize = () => {
        setMinimize(prev => !prev)
    }

    return (
        <nav className={`bg-gradient-to-b from-teal-200 to-blueocean h-full flex flex-col transition-all duration-300 ${minimize ? 'w-16' : 'md:w-1/6'}`}>
            <div className="flex-none h-20 flex items-center justify-center">
                <FaDev />
            </div>
            <ul className="flex-grow">
                {sideBarMenu.map((item, index) => (
                    <li key={index}>
                        <Link href={`${item.path}${minimize ? '?minimize' : ''}`}>
                            <div className={`flex space-x-3 items-center pl-5 h-16 cursor-pointer 
                                ${item.path == router.pathname ? 'bg-teal-400' : ''}`}>
                                <div className="flex-none">
                                    {item.icon}
                                </div>
                                <span className={`text-md flex-grow transition duration-150 ${minimize ? 'opacity-0' : ''}`}>{item.title}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div
                onClick={handleMinimize}
                className="w-12 h-12 bg-white shadow-md self-center rounded-full mb-10 flex justify-center items-center cursor-pointer">
                <FaChevronLeft className={`transition duration-300 ${minimize ? 'transform rotate-180' : ''}`} />
            </div>
        </nav>
    );
}