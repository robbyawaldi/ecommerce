import React from 'react';
import { Button } from '@chakra-ui/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaFilter } from 'react-icons/fa';
import { Tooltip } from '@chakra-ui/tooltip';
import { useRouter } from 'next/router';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useCategoriesQuery } from '../../generated/graphql';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';

interface ProductToolsProps { }

export const ProductTools: React.FC<ProductToolsProps> = ({ }) => {
    const router = useRouter();
    const { data, error, loading } = useCategoriesQuery();

    const errorCategoryMessage = loadingOrQueryFailed({ data, error, loading });
    if (errorCategoryMessage) return errorCategoryMessage;

    return (
        <div className="flex p-2 md:max-w-sm w-full">
            <Tooltip label="Add Product">
                <Button
                    isFullWidth
                    onClick={() => router.push('products/new')}
                    leftIcon={<AiOutlinePlus />}
                    colorScheme="blue">
                    Add
                </Button>
            </Tooltip>
            <Menu>
                {({ isOpen }) => (
                    <>
                        <Tooltip label="Filter Product">
                            <MenuButton
                                isActive={isOpen}
                                as={Button}
                                leftIcon={<FaFilter />}
                                w="full"
                                ml={4}
                            >
                                Filter
                            </MenuButton>
                        </Tooltip>
                        <MenuList className="z-auto">
                            <MenuItem key="all" onClick={
                                () => {
                                    const { fc, ...query } = router.query
                                    router.push({
                                        query: { ...query }
                                    })
                                }
                            }>
                                All
                            </MenuItem>
                            {data?.categories?.map((category) => (
                                <MenuItem key={category.id} onClick={
                                    () => router.push({
                                        query: { ...router.query, fc: category.id }

                                    })
                                }>{category.name}</MenuItem>
                            ))}
                        </MenuList>
                    </>
                )}
            </Menu>
        </div>
    );
}