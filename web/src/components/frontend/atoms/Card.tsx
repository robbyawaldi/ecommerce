import toRupiah from '@develoka/angka-rupiah-js';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react'
import { Product } from '../../../generated/graphql';
import styles from '../../../styles/frontend/Card.module.css'
import { calculateDiscount } from '../../../utils/discount';
import { textLimit } from '../../../utils/textLimit';

interface CardProps {
    product: Product
}

export const Card: React.FC<CardProps> = ({ product }) => {
    const router = useRouter()

    const handleClick = useCallback(() => {
        router.push({
            pathname: `/${product.slug}`
        })
    }, [product])

    return (
        <div className={styles.card} onClick={handleClick}>
            <img className={styles.img} src={product.images[0].url} />
            <h1>{product.title}</h1>
            <p>{textLimit(product.description)}</p>
            {
                product.isDiscount ? (
                    <div>
                        <div className="text-xs line-through">{toRupiah(product.price, { floatingPoint: 0 })}</div>
                        <div className="font-semibold text-gold">{toRupiah(calculateDiscount({ price: product.price, discount: product.discount }), { floatingPoint: 0 })}</div>
                    </div>
                ) : (
                    <div className="font-semibold text-gold">{toRupiah(product.price, { floatingPoint: 0 })}</div>
                )
            }
        </div>
    );
}