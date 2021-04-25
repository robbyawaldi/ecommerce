import React from 'react'
import SizeS from '../../../assets/size-s.svg'
import SizeM from '../../../assets/size-m.svg'
import SizeL from '../../../assets/size-l.svg'
import SizeXL from '../../../assets/size-xl.svg'
import SizeXXL from '../../../assets/size-xxl.svg'

interface SizeProps { }

export const Size: React.FC<SizeProps> = ({ }) => {
 return (
        <div className="flex justify-center md:justify-between flex-wrap">
                <SizeS />
                <SizeM />
                <SizeL />
                <SizeXL />
                <SizeXXL />
                <p className="flex mt-5 text-center md:text-left">Ukuran bisa ditanyakan langsung melalui Whatsapp atau 
                klik butuh bantuan untuk bertanya tentang ukuran</p>
        </div>
 );
}