import React from 'react'

interface SizeProps { }

export const Size: React.FC<SizeProps> = ({ }) => {
        return (
                <div className="flex flex-col">
                        <div className="flex justify-center md:justify-between flex-wrap">
                                <img src="/assets/size-s.svg" alt="size s" />
                                <img src="/assets/size-m.svg" alt="size m" />
                                <img src="/assets/size-l.svg" alt="size l" />
                                <img src="/assets/size-xl.svg" alt="size xl" />
                                <img src="/assets/size-xxl.svg" alt="size xxl" />
                        </div>
                        <p className="block mt-5 text-center md:text-left">
                                Ukuran bisa ditanyakan langsung melalui Whatsapp atau
                                klik butuh bantuan untuk bertanya tentang ukuran
                         </p>
                </div>
        );
}