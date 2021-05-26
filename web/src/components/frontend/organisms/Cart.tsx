import { Button } from '@chakra-ui/button';
import { UseDisclosureReturn } from '@chakra-ui/hooks';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/modal';
import toRupiah from '@develoka/angka-rupiah-js';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../contexts/CartContext';
import { Product, useProductsQuery } from '../../../generated/graphql';
import styles from '../../../styles/frontend/Cart.module.css'
import { calculateDiscount } from '../../../utils/discount';
import { generateText } from '../../../utils/generateText';
import { loadingOrQueryFailed } from '../../../utils/loadingOrQueryFailed';
import { CartItem } from '../molecules/CartItem';

interface CartProps {
    disclosure: UseDisclosureReturn
}

export const Cart: React.FC<CartProps> = ({ disclosure: { isOpen, onClose } }) => {
    const { carts } = useContext(CartContext)
    const { data, error, loading, refetch } = useProductsQuery({
        variables: {
            page: 1,
            limit: carts.length,
            ids: carts.map((cart) => cart.id)
        }
    })
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        refetch({ ids: carts.map((cart) => cart.id) })
    }, [carts])

    useEffect(() => {
        setSubTotal(
            carts.reduce((a, b) => {
                const product = data?.products?.products.find(product => product.id == b.id)
                if (product) {
                    if (product.isDiscount) {
                        return calculateDiscount({ price: product.price, discount: product.discount }) * b.qty + a
                    }
                    return product.price * b.qty + a
                }
                return a
            }, 0)
        )
    }, [data, carts])

    const handleBuy = () => {
        const phone = '+6282118093170'
        const items = carts.map((cart) => {
            const details = data?.products?.products.find(d => d.id == cart.id)
            return {
                title: details?.title ?? "",
                size: cart.size,
                price: toRupiah(details?.price ?? 0, { floatingPoint: 0 }) ?? "",
                qty: cart.qty
            }
        })
        const text = generateText(items, toRupiah(subTotal, { floatingPoint: 0 }))
        window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`, '_blank')
    }

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) {
        return errorMessage
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size="md"
        >
            <DrawerOverlay>
                <DrawerContent bgColor="black" color="white" className={styles.content}>
                    <DrawerCloseButton className={styles.close} />
                    <DrawerHeader className={styles.header}>
                        <img src="/assets/logo-white.svg" alt="logo white" />
                        <img src="/assets/shoppingcart-icon.svg" alt="shopping icon" />
                        <div className={styles.title}>Barang Belanja</div>
                    </DrawerHeader>
                    <DrawerBody className={styles.body}>
                        {data?.products?.products?.map((product) => {
                            const cart = carts.find((cart) => cart.id == product.id)

                            return (
                                <CartItem
                                    key={product.id}
                                    product={product as Product}
                                    size={cart?.size as string}
                                    qty={cart?.qty as number}
                                />
                            )
                        })}
                    </DrawerBody>
                    <DrawerFooter className={styles.footer}>
                        <p>SubTotal <span className="font-bold">{toRupiah(subTotal, { floatPoint: 0 })}</span></p>
                        <Button className={styles.button} onClick={handleBuy}>Beli</Button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
}