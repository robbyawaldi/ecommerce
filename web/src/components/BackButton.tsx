import { useRouter } from 'next/router';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

interface BackButtonProps { }

export const BackButton: React.FC<BackButtonProps> = ({ }) => {
    const router = useRouter()

    const handleBack = () => router.back()

    return (
        <>
            <FaArrowLeft size={20} className="cursor-pointer" onClick={handleBack}/>
        </>
    );
}