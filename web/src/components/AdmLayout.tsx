import React from 'react'
import { AdmHeader } from './AdmHeader'
import { SideBar } from './SideBar'

interface AdmLayoutProps {
}

export const AdmLayout: React.FC<AdmLayoutProps> = ({ children }) => {
    return (
        <div className="flex">
            <SideBar />
            <div className="container z-10">
                <AdmHeader />
                {children}
            </div>
        </div>
    );
}