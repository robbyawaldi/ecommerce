import toRupiah from '@develoka/angka-rupiah-js';
import { useRouter } from 'next/router';
import React from 'react'
import { Product } from '../../../generated/graphql';
import styles from '../../../styles/frontend/Card.module.css'
import { textLimit } from '../../../utils/textLimit';

interface CardProps {
    product: Product
}

export const Card: React.FC<CardProps> = ({ product }) => {
    const router = useRouter()

    return (
        <div className={styles.card}>
            <img className={styles.img} src={product.images[0].url} />
            <h1>{product.title}</h1>
            <p>{textLimit(product.description)}</p>
            <div>{toRupiah(product.price, { floatingPoint: 0 })}</div>
        </div>
    );
}