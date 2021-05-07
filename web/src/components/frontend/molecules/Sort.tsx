import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react'

interface SortProps { }

export const Sort: React.FC<SortProps> = ({ }) => {
    return (
        <Box
            d="flex"
            flexDirection="column"
            w="14em"
            borderWidth="1px"
            borderRadius="lg"
            bgColor="gray.200"
        >
            <p className="font-bold px-4 mt-5">Urutkan Berdasarkan</p>
            <Link href="/categories?sortByName=ASC">
                <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Nama Produk (A - Z)</Button>
            </Link>
            <Link href="/categories?sortByName=DESC">
                <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Nama Produk (Z - A)</Button>
            </Link>
            <Link href="/categories?sortByPrice=ASC">
                <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Harga Terendah</Button>
            </Link>
            <Link href="/categories?sortByPrice=DESC">
                <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Harga Tertinggi</Button>
            </Link>
        </Box>
    );
}