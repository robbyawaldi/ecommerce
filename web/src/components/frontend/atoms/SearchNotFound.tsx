import React from 'react'

interface SearchNotFoundProps { }

export const SearchNotFound: React.FC<SearchNotFoundProps> = ({ }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center p-12 text-center">
            <img src="/assets/searchnotfound.jpg" alt="search not found logo" className="md:w-3/6" />
            <h1 className="font-semibold text-lg my-5">Pencarian tidak ditemukan</h1>
            <p>Silahkan cek kembali pencarian kamu dan coba lagi</p>
        </div>
    );
}