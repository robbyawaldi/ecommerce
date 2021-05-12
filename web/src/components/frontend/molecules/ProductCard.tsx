import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { CartContext } from '../../../contexts/CartContext';
import { Product, Size } from '../../../generated/graphql';
import styles from '../../../styles/frontend/ProductCard.module.css'
import { textLimit } from '../../../utils/textLimit';
import { SizeSelect } from '../atoms/SizeSelect';

interface ProductCardProps {
    product: Product | undefined
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { dispatch } = useContext(CartContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [size, setSize] = useState("")
    const router = useRouter()

    const handleAddToCart = () => {
        onOpen()
        dispatch({ 
            type: "ADD", 
            payload: { 
                id: product?.id ?? "", 
                qty: 1, 
                size 
            } 
        })
    }

    return (
        <div className={styles.box}>
            <div>
                <h1>{product?.title}</h1>
                <p>{textLimit(product?.description ?? "")}</p>
            </div>
            <div>{toRupiah(product?.price ?? 0, { floatingPoint: 0 })}</div>
            <SizeSelect
                sizes={product?.sizes as Size[]}
                value={size}
                setValue={setSize}
            />
            <Button
                onClick={handleAddToCart}
                size="sm"
                variant="solid"
                leftIcon={<AiOutlinePlus />}
                className={styles.button}>
                Tambah Keranjang
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="h-20 flex justify-center items-center font-bold">
                            Berhasil Ditambahkan Ke Keranjang
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Tutup
                        </Button>
                        <Link href={{ query: { ...router.query, openCart: '' } }}>
                            <Button style={{ background: '#B38426', color: '#FFFFFF' }} onClick={onClose}>
                                Buka Keranjang
                            </Button>
                        </Link>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}