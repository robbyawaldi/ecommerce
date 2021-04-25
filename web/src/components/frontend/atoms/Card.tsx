import React from 'react'
import styles from '../../../styles/frontend/Card.module.css'
import { textLimit } from '../../../utils/textLimit';

interface CardProps { }

export const Card: React.FC<CardProps> = ({ }) => {
    return (
        <div className={styles.card}>
            <img src="/assets/product_sample.png" />
            <h1>Dress Merah</h1>
            <p>{textLimit('Lorem ipsum dolor Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores in asperiores quas similique rem dolores.')}</p>
            <div>Rp289.000</div>
        </div>
    );
}