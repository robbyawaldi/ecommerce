import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { CartContext } from '../../../contexts/CartContext';
import { Product, Size } from '../../../generated/graphql';
import styles from '../../../styles/frontend/ProductCard.module.css'
import { calculateDiscount } from '../../../utils/discount';
import { textLimit } from '../../../utils/textLimit';
import { ColorSelect } from './ColorSelect';
import { SizeSelect } from '../atoms/SizeSelect';
import { DetailContext } from '../../../contexts/detailContext';

interface ProductCardProps {
    product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { dispatch } = useContext(CartContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { productDetail: { size, color }, dispatch: productDispatch } = useContext(DetailContext)

    const router = useRouter()

    const price = useMemo(() => {
        return product.priceSizes
            .find(p => p.sizeName == size)?.price
            ?? product.price
    }, [size])

    const handleAddToCart = () => {
        onOpen()
        dispatch({
            type: "ADD",
            payload: {
                id: product.id,
                qty: 1,
                size,
                color
            }
        })
    }

    const handleSetColor = (value: any) => productDispatch({ type: "UPDATE", color: value })
    const handleSetSize = (value: any) => productDispatch({ type: "UPDATE", size: value })

    return (
        <div className={styles.box}>
            <div>
                <h1>{product.title}</h1>
                <p>{textLimit(product.description ?? "")}</p>
            </div>
            <div>
                {
                    product.isDiscount ? (
                        <>
                            <div className="line-through">{toRupiah(price, { floatingPoint: 0 })}</div>
                            <div className="text-lg font-semibold text-gold">{toRupiah(calculateDiscount({ price, discount: product.discount }), { floatingPoint: 0 })}</div>
                        </>
                    ) : (
                        <div className="text-lg font-semibold text-gold">{toRupiah(price, { floatingPoint: 0 })}</div>
                    )
                }
            </div>
            <ColorSelect
                colors={product.colors.filter(color => color.exceptSizes?.find(s => s.name == size) == undefined)}
                value={color}
                setValue={handleSetColor}
            />

            <SizeSelect
                sizes={product.sizes as Size[]}
                value={size}
                setValue={handleSetSize}
            />
            <Button
                disabled={!product.stockAvailable}
                onClick={handleAddToCart}
                size="sm"
                variant="solid"
                leftIcon={<AiOutlinePlus />}
                className={styles.button}>
                {product.stockAvailable ? 'Tambah Keranjang' : 'Stok Kosong'}
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