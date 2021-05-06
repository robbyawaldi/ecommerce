import { Button, Select } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { Product } from '../../../generated/graphql';
import styles from '../../../styles/frontend/ProductCard.module.css'
import { textLimit } from '../../../utils/textLimit';
import { SizeSelect } from '../atoms/SizeSelect';

interface ProductCardProps {
    product: Product | undefined
 }

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className={styles.box}>
            <div>
                <h1>{product?.title}</h1>
                <p>{textLimit(product?.description ?? "")}</p>
            </div>
            <div>{toRupiah(product?.price ?? 0, {floatingPoint: 0})}</div>
           <SizeSelect />
            <Button
                size="sm"
                variant="solid"
                leftIcon={<AiOutlinePlus />}
                className={styles.button}>
                Tambah Keranjang
            </Button>
        </div>
    );
}