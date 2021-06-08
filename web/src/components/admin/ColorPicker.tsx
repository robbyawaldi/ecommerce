import { Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BlockPicker, ColorResult } from 'react-color';
import styles from '../../styles/ColorPicker.module.css'
import { isServer } from '../../utils/isServer';
import { BsFillTrashFill } from 'react-icons/bs'

interface ColorPickerProps { }

export const ColorPicker: React.FC<ColorPickerProps> = ({ }) => {
        const [color, setColor] = useState('#22194D')
        const [name, setName] = useState('')
        const [show, setShow] = useState(false)

        const handleShow: React.MouseEventHandler<HTMLDivElement> = (e) => {
                if (e.target == e.currentTarget) setShow(s => !s)
        }

        const handleChangeColor = (color: ColorResult) => {
                setColor(color.hex)
        }

        const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
                if (e.key == 'Enter') {
                        setShow(false)
                }
        }

        return (
                <div className={styles.wrapper}>
                        <Input className={styles.field} value={name} onChange={(e) => setName(e.target.value)} placeholder="color name" />
                        <div className={styles.color} onClick={handleShow} onKeyPress={handleKeyPress} style={{ backgroundColor: color }}>
                                {show
                                        ?
                                        <BlockPicker
                                                className={styles.picker}
                                                color={color}
                                                triangle={!isServer() && window.screen.width > 640 ? "top" : "hide"}
                                                onChangeComplete={handleChangeColor}

                                        />
                                        : null
                                }
                        </div>
                        <BsFillTrashFill className={styles.delete} />
                </div>
        );
}