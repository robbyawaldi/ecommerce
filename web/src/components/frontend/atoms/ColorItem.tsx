import { RadioProps, useRadio } from '@chakra-ui/react'
import React from 'react'
import styles from '../../../styles/frontend/ColorItem.module.css'

interface ColorItemProps {
    code: string
    isDataCheckedStyles?: boolean
    isAdmin?: boolean
}

export const ColorItem: React.FC<ColorItemProps> = ({
    code,
    isDataCheckedStyles = true,
    isAdmin = false,
    ...props
}: ColorItemProps & React.PropsWithChildren<RadioProps>) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <label>
            <input {...input} />
            <div
                {...checkbox}
                className={`
                ${styles.wrapper} 
                ${styles[isDataCheckedStyles
                        ? isAdmin
                            ? "forAdmin"
                            : "withDataChecked"
                        : ""]}
                `}
            >
                <div className={styles.color} style={{ backgroundColor: code }}></div>
                {props.children}
            </div>
        </label>
    );
}