import React from 'react'
import { SideBar } from './SideBar'

interface AdmLayoutProps {
}

export const AdmLayout: React.FC<AdmLayoutProps> = ({children}) => {
        return (
            <div className="flex">
            <SideBar />
            <div className="container z-10">
            {children}
            </div>
            </div>
        );
}