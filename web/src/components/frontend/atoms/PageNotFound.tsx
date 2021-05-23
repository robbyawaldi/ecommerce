import Link from 'next/link';
import React from 'react'

interface PageNotFoundProps { }

export const PageNotFound: React.FC<PageNotFoundProps> = ({ }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center p-12 text-center">
            <img src="/assets/404.jpg" alt="404 logo" className="md:w-3/6 w-5/6" />
            <h1 className="font-semibold text-lg my-5">Maaf, Halaman Tidak Ditemukan</h1>
            <p>Halaman ini tidak ada, Silahkan ke <Link href="/"><a className="underline">Beranda</a></Link> </p>
        </div>
    );
}