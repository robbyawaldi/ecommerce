import { IconButton } from '@chakra-ui/button';
import React from 'react'
import { Quantity } from '../atoms/Quantity'
import { SizeSelect } from '../atoms/SizeSelect';
import {RiCloseLine} from 'react-icons/ri'

interface CartItemProps {}

export const CartItem: React.FC<CartItemProps> = ({}) => {
        return (
            <div className="bg-white text-black w-full flex mb-3 relative">
                <IconButton 
                    style={{position: 'absolute'}}
                    className="top-0 right-0"
                    aria-label="delete item"
                    icon={<RiCloseLine size={24}/>}
                    variant="ghost"/>
                <img src="/assets/product_sample.png" className="w-2/6 mr-2"/>
                <div className="flex flex-col w-6/12 box-border p-3">
                    <p className="font-bold my-5">Dess Merah</p>
                    <SizeSelect outlineColor="black" />
                    <p className="font-bold my-5">Rp289.000</p>
                    <Quantity />
                </div>
            </div>
        );
}