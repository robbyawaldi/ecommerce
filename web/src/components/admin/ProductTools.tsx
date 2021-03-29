import React from 'react'
import { Button } from '@chakra-ui/button'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaFilter } from 'react-icons/fa'
import { Tooltip } from '@chakra-ui/tooltip';
import { useRouter } from 'next/router'
import { Menu, MenuButton, MenuItem, MenuList, useClipboard, useControllableProp, useDisclosure } from '@chakra-ui/react';

interface ProductToolsProps { }

export const ProductTools: React.FC<ProductToolsProps> = ({ }) => {
    const router = useRouter()

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
                            <MenuItem>a</MenuItem>
                            <MenuItem>b</MenuItem>
                            <MenuItem>c</MenuItem>
                        </MenuList>
                    </>
                )}
            </Menu>
            {/* <Button isFullWidth className="ml-4" leftIcon={<FaFilter />}>Filter</Button> */}
        </div>
    );
}