import React from 'react'
import { Button } from '@chakra-ui/button'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaFilter } from 'react-icons/fa'
import { BiSort } from 'react-icons/bi'
import { Tooltip } from '@chakra-ui/tooltip';
import { useRouter } from 'next/router'

interface ProductToolsProps { }

export const ProductTools: React.FC<ProductToolsProps> = ({ }) => {
    const router = useRouter()

    return (
        <div className="flex p-2 w-full justify-between">
            <Tooltip label="Add Product">
                <Button 
                    onClick={() => router.push('products/new')}
                    leftIcon={<AiOutlinePlus />} 
                    colorScheme="blue">
                        Add
                </Button>
            </Tooltip>
            <div className="w-48 ml-2 flex justify-between">
                <Tooltip label="Filter Product">
                    <Button leftIcon={<FaFilter />}>Filter</Button>
                </Tooltip>
                <Tooltip label="Sorting Product">
                    <Button leftIcon={<BiSort />}>Sort</Button>
                </Tooltip>
            </div>
        </div>
    );
}