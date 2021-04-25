import { Box, Button } from '@chakra-ui/react';
import React from 'react'

interface SortProps { }

export const Sort: React.FC<SortProps> = ({ }) => {
    return (
        <Box
            d="flex"
            flexDirection="column"
            maxW="fit-content"
            borderWidth="1px"
            borderRadius="lg"
            bgColor="gray.200"
        >
            <p className="font-bold px-4 mt-5">Urutkan Berdasarkan</p>
            <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Nama Produk (A - Z)</Button>
            <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Nama Produk (Z - A)</Button>
            <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Harga Terendah</Button>
            <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Harga Tertinggi</Button>
        </Box>
    );
}