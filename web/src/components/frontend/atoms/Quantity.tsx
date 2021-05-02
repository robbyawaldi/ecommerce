import { IconButton } from '@chakra-ui/button'
import React, { useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';

interface QuantityProps { }

export const Quantity: React.FC<QuantityProps> = ({ }) => {
    const [amount, setAmount] = useState(1)

    return (
        <div className="w-4/6 flex justify-between items-center text-white border border-gray-600 rounded-3xl p-1">
            <IconButton
                size="xs"
                bgColor="gray.600"
                _hover={{bg: 'gray.500'}}
                rounded="full"
                aria-label="minus"
                icon={<FiMinus />}
                onClick={() => setAmount(a => a > 1 ? a - 1 : a)}
            />
            <span className="font-bold text-black">
            {amount}
            </span>
            <IconButton
                size="xs"
                bgColor="gray.600"
                _hover={{bg: 'gray.500'}}
                rounded="full"
                aria-label="minus"
                icon={<FiPlus />}
                onClick={() => setAmount(a => a + 1)}
            />
        </div>
    );
}