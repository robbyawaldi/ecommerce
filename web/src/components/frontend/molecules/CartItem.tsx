import { IconButton } from '@chakra-ui/button';
import React, { useContext, useEffect, useState } from 'react'
import { Quantity } from '../atoms/Quantity'
import { SizeSelect } from '../atoms/SizeSelect';
import { RiCloseLine } from 'react-icons/ri'
import { Product } from '../../../generated/graphql';
import toRupiah from '@develoka/angka-rupiah-js';
import { CartContext } from '../../../contexts/CartContext';
import { calculateDiscount } from '../../../utils/discount';

interface CartItemProps {
    product: Product,
    size: string,
    qty: number
}

export const CartItem: React.FC<CartItemProps> = ({ product, size: sizeProps, qty: qtyProps }) => {
    const [size, setSize] = useState(sizeProps)
    const [qty, setQty] = useState(qtyProps)
    const { dispatch } = useContext(CartContext)

    useEffect(() => {
        dispatch({
            type: 'UPDATE',
            payload: {
                id: product.id,
                size,
                qty
            }
        })
    }, [size, qty])

    const handleDelete = () => {
        dispatch({
            type: 'DELETE',
            payload: product.id
        })
    }

    return (
        <div className="bg-white text-black w-full flex mb-3 relative">
            <IconButton
                style={{ position: 'absolute' }}
                className="top-0 right-0"
                aria-label="delete item"
                icon={<RiCloseLine size={24} />}
                variant="ghost"
                onClick={handleDelete} />
            <img src={product.images[0]?.url ?? ''} className="w-2/6 mr-2" />
            <div className="flex flex-col w-6/12 box-border p-3">
                <p className="font-bold my-5">{product.title}</p>
                <SizeSelect
                    outlineColor="black"
                    sizes={product.sizes}
                    setValue={setSize}
                    value={size}
                />

                {
                    product.isDiscount ? (
                        <div className="my-5">
                            <div className="text-xs line-through">{toRupiah(product.price, { floatingPoint: 0 })}</div>
                            <div className="font-semibold text-gold">{toRupiah(calculateDiscount({ price: product.price, discount: product.discount }), { floatingPoint: 0 })}</div>
                        </div>
                    ) : (
                        <div className="font-semibold text-gold my-5">{toRupiah(product.price, { floatingPoint: 0 })}</div>
                    )
                }
                <Quantity
                    setValue={setQty}
                    value={qty}
                />
            </div>
        </div>
    );
}