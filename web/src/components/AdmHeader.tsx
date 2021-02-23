import React from 'react'

interface AdmHeaderProps {

}

export const AdmHeader: React.FC<AdmHeaderProps> = ({}) => {
        return (
            <div className="px-3 py-2 flex w-full h-14 justify-between">
                <div className="text-xl">
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