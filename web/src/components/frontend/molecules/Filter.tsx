import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React from 'react'

interface FilterProps { }

export const Filter: React.FC<FilterProps> = ({ }) => {
    return (
        <Box
            d="flex"
            flexDirection="column"
            maxW="188.1px"
            borderWidth="1px"
            borderRadius="lg"
            bgColor="gray.200"
        >
            <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Semua Produk</Button>
            <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Koleksi Eksklusif</Button>
            <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Diskon</Button>
            <p className="font-bold px-4 mt-5">Kategori</p>
            <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Gamis</Button>
            <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Tunik</Button>
        </Box>
    );
}