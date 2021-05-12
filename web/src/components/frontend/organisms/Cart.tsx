import { Button } from '@chakra-ui/button';
import { UseDisclosureReturn } from '@chakra-ui/hooks';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/modal';
import React, { useContext, useEffect, useState } from 'react'
import LogoWhite from '../../../assets/Logo-white.svg'
import ShoppingCart from '../../../assets/shoppingcart-icon.svg'
import { CartContext } from '../../../contexts/CartContext';
import { Product, useProductsQuery } from '../../../generated/graphql';
import styles from '../../../styles/frontend/Cart.module.css'
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
            ids: carts
        }
    })

    useEffect(() => {
        refetch({ ids: carts })
    }, [carts])

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
                        <LogoWhite />
                        <ShoppingCart />
                        <div className={styles.title}>Barang Belanja</div>
                    </DrawerHeader>
                    <DrawerBody className={styles.body}>
                        {data?.products?.products?.map((product) => (
                            <CartItem key={product.id} product={product as Product} />
                        ))}
                    </DrawerBody>
                    <DrawerFooter className={styles.footer}>
                        <p>SubTotal <span className="font-bold">Rp1.000.000</span></p>
                        <Button className={styles.button}>Beli</Button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
}