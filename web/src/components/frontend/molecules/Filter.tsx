import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { query } from '@urql/exchange-graphcache';
import Link from 'next/link';
import React from 'react'
import { useCategoriesQuery } from '../../../generated/graphql';
import { loadingOrQueryFailed } from '../../../utils/loadingOrQueryFailed';

interface FilterProps { }

export const Filter: React.FC<FilterProps> = ({ }) => {
    const { data, error, loading } = useCategoriesQuery({
        variables: {
            level: 1
        }
    })

    const errorCategoryMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorCategoryMessage) {
        return errorCategoryMessage
    }

    return (
        <Box
            d="flex"
            flexDirection="column"
            w="14em"
            borderWidth="1px"
            borderRadius="lg"
            bgColor="gray.200"
        >
            <Link href="/categories">
                <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Semua Produk</Button>
            </Link>
            <Link href="/categories?exclusive">
                <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Koleksi Eksklusif</Button>
            </Link>
            <Link href="/categories?discount">
                <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">Diskon</Button>
            </Link>
            <p className="font-bold px-4 mt-5">Kategori</p>

            {data?.categories?.map(category => (
                <Link key={category.id} href={{
                    query: { id: category.id }
                }}>
                    <Button fontWeight="normal" justifyContent="flex-start" variant="ghost">{category.name}</Button>
                </Link>
            ))
            }
        </Box >
    );
}