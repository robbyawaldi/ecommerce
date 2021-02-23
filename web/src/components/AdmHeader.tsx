import React from 'react'

interface AdmHeaderProps {

}

export const AdmHeader: React.FC<AdmHeaderProps> = ({}) => {
        return (
            <div className="py-2 flex w-full h-14 md:justify-between justify-end">
                <div className="text-xl md:inline hidden">
                    Admin Siti Hajar
                </div>
                <figure className="justify-self-center space-x-2 flex items-center">
                    <figcaption>
                    robbyawaldi@gmail.com
                    </figcaption>
                    <div className="w-9 h-9 rounded-full bg-teal-200">
                    </div>
                </figure>
            </div>
        );
}