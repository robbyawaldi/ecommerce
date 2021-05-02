import { Button } from '@chakra-ui/button';
import { UseDisclosureReturn } from '@chakra-ui/hooks';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/modal';
import React from 'react'
import LogoWhite from '../../../assets/Logo-white.svg'
import ShoppingCart from '../../../assets/shoppingcart-icon.svg'
import styles from '../../../styles/frontend/Cart.module.css'
import { Quantity } from '../atoms/Quantity';
import { CartItem } from '../molecules/CartItem';

interface CartProps {
    disclosure: UseDisclosureReturn
 }

export const Cart: React.FC<CartProps> = ({ disclosure: {isOpen, onClose} }) => {
    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size="md"
        >
            <DrawerOverlay>
                <DrawerContent bgColor="black" color="white" className={styles.content}>
                    <DrawerCloseButton className={styles.close}/>
                    <DrawerHeader className={styles.header}> 
                        <LogoWhite />
                        <ShoppingCart />
                        <div className={styles.title}>Barang Belanja</div>
                    </DrawerHeader>
                    <DrawerBody className={styles.body}>
                        <CartItem />
                        <CartItem />
                        <CartItem />
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