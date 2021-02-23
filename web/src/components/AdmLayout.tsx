import React from 'react'
import { AdmHeader } from './AdmHeader'
import { SideBar } from './SideBar'

interface AdmLayoutProps {
}

export const AdmLayout: React.FC<AdmLayoutProps> = ({ children }) => {
    return (
        <div className="flex items-stretch h-screen">
            <SideBar />
            <div className="w-full z-10 bg-gray-50 px-2 overflow-y-auto">
                <AdmHeader />
                {children}
            </div>
        </div>
    );
}