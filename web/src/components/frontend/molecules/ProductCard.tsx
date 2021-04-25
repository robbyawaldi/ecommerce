import { Button, Select } from '@chakra-ui/react';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import styles from '../../../styles/frontend/ProductCard.module.css'
import { textLimit } from '../../../utils/textLimit';

interface ProductCardProps { }

export const ProductCard: React.FC<ProductCardProps> = ({ }) => {
    return (
        <div className={styles.box}>
            <div>
                <h1>Dress Merah</h1>
                <p>{textLimit('Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ipsum voluptate similique sit voluptates in?')}</p>
            </div>
            <div>Rp28800</div>
            <Select className={styles.select} placeholder="Pilih Ukuran">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
            </Select>
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