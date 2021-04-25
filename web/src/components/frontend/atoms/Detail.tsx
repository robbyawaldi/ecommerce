import React from 'react'

interface DetailProps { }

export const Detail: React.FC<DetailProps> = ({ }) => {
    return (
        <>
            <h1 className="font-bold">Info & Perawatan</h1>
            <p>Bahan ITY Special</p>
            <p>Berat Ringan</p>
            <p>Cuci dengan mesin dingin</p>
            <h1 className="font-bold mt-5">Penolakan</h1>
            <p>
            ITEM SALE tidak dapat ditukar atau dikembalikan. Dengan membeli item ini, Anda telah menyetujui Syarat & Ketentuan kami. Tidak ada pengembalian, tidak ada pertukaran, tidak ada pengembalian uang.
            </p>
        </>
    );
}