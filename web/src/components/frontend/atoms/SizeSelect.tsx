import { Select } from '@chakra-ui/react';
import React from 'react'
import styles from '../../../styles/frontend/SizeSelect.module.css'

interface SizeSelectProps {
    outlineColor?: 'black' | 'gold'
}

export const SizeSelect: React.FC<SizeSelectProps> = ({ outlineColor = 'gold' }) => {
    return (
        <Select className={`${styles.select} ${styles[outlineColor]}`} placeholder="Pilih Ukuran">
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
        </Select>
    );
}