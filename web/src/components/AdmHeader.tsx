import { useRouter } from 'next/router';
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

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
        <div className="py-2 pr-2 flex w-full h-14 md:justify-between justify-end">
            <div className="text-xl md:inline hidden">
                Admin Siti Hajar
                </div>
            <div className="dropdown">
                {data?.me ? (
                    <button className="flex justify-end items-center w-full focus:outline-none">
                        {data.me.email}
                        <div className="w-9 h-9 rounded-full ml-3 bg-teal-200">
                        </div>
                    </button>
                ) : null}
                <div className="dropdown-content">
                    <button
                        className="border-none p-5 w-full hover:bg-gray-200 focus:outline-none"
                        onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}