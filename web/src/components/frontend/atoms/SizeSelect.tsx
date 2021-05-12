import { Select } from '@chakra-ui/react';
import React from 'react'
import { Size } from '../../../generated/graphql';
import styles from '../../../styles/frontend/SizeSelect.module.css'

interface SizeSelectProps {
    outlineColor?: 'black' | 'gold',
    sizes: Size[],
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export const SizeSelect: React.FC<SizeSelectProps> = ({ outlineColor = 'gold', sizes, value, setValue }) => {
    return (
        <Select 
            onChange={e => setValue(e.target.value)}
            className={`${styles.select} ${styles[outlineColor]}`} 
            placeholder="Pilih Ukuran"
            value={value}>
            {sizes?.map((size) => (
                <option key={size.id} value={size.name}>{size.name}</option>
            ))}
        </Select>
    );
}