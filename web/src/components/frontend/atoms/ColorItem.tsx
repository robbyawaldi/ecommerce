import { RadioProps, useRadio } from '@chakra-ui/react'
import React from 'react'
import styles from '../../../styles/frontend/ColorItem.module.css'

interface ColorItemProps {
    code: string
}

export const ColorItem: React.FC<ColorItemProps> = ({ code, ...props }: ColorItemProps & React.PropsWithChildren<RadioProps>) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <label>
            <input {...input} />
            <div
                {...checkbox}
                className={styles.wrapper}
            >
                <div className={styles.color} style={{ backgroundColor: code }}></div>
                {props.children}
            </div>
        </label>
    );
}