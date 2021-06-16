import { IconButton } from '@chakra-ui/button';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Quantity } from '../atoms/Quantity'
import { SizeSelect } from '../atoms/SizeSelect';
import { RiCloseLine } from 'react-icons/ri'
import { Product } from '../../../generated/graphql';
import toRupiah from '@develoka/angka-rupiah-js';
import { CartContext } from '../../../contexts/CartContext';
import { calculateDiscount } from '../../../utils/discount';
import { ColorSelect } from './ColorSelect';

interface CartItemProps {
    product: Product,
    size: string,
    qty: number,
    color: string,
}

export const CartItem: React.FC<CartItemProps> = ({ product, size: sizeProps, qty: qtyProps, color: colorProps }) => {
    const [size, setSize] = useState(sizeProps)
    const [qty, setQty] = useState(qtyProps)
    const [color, setColor] = useState(colorProps)
    const { dispatch } = useContext(CartContext)

    const price = useMemo(() => {
        return product.priceSizes
            .find(p => p.sizeName == size)?.price
            ?? product.price
    }, [size])

    useEffect(() => {
        dispatch({
            type: 'UPDATE',
            payload: {
                id: product.id,
                size,
                qty,
                color
            }
        })
    }, [size, qty, color])

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
            <img src={product.images[0]?.url ?? ''} className="w-6/12 mr-2 object-cover" />
            <div className="flex flex-col w-6/12 box-border p-3">
                <p className="font-bold my-5">{product.title}</p>
                <SizeSelect
                    outlineColor="black"
                    sizes={product.sizes}
                    setValue={setSize}
                    value={size}
                />
                <div className="my-3">
                    <ColorSelect
                        colors={product.colors.filter(color => color.exceptSizes?.find(s => s.name == size) == undefined)}
                        value={color}
                        setValue={setColor}
                    />
                </div>

                {
                    product.isDiscount ? (
                        <div className="my-5">
                            <div className="text-xs line-through">{toRupiah(price, { floatingPoint: 0 })}</div>
                            <div className="font-semibold text-gold">{toRupiah(calculateDiscount({ price, discount: product.discount }), { floatingPoint: 0 })}</div>
                        </div>
                    ) : (
                        <div className="font-semibold text-gold my-5">{toRupiah(price, { floatingPoint: 0 })}</div>
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