import { Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { BlockPicker, ColorResult } from 'react-color';
import styles from '../../styles/ColorPicker.module.css'
import { isServer } from '../../utils/isServer';
import { BsFillTrashFill } from 'react-icons/bs'
import { ColorAction, ProductColor } from '../../types/colors';
import { useDeleteColorMutation } from '../../generated/graphql';

interface ColorPickerProps {
        dispatch: React.Dispatch<ColorAction>;
        color: ProductColor
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ dispatch, color: { id, code, name, __typename } }) => {
        const [show, setShow] = useState(false)
        const [deleteColor] = useDeleteColorMutation()

        useEffect(() => {
                document.body.addEventListener('mousedown', (e: MouseEvent) => {
                        const targetClassName = (e.target as HTMLDivElement).offsetParent?.className ?? ""
                        if (!targetClassName.includes('ColorPicker')) setShow(false)
                })
        }, [])

        const handleShow: React.MouseEventHandler<HTMLDivElement> = (e) => {
                if (e.target == e.currentTarget) setShow(s => !s)
        }

        const handleChangeColor = (color: ColorResult) => {
                dispatch({ type: "UPDATE", id, code: color.hex })
        }

        const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                dispatch({ type: "UPDATE", id, name: e.target.value })
        }

        const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
                if (e.key == 'Enter') {
                        setShow(false)
                }
        }

        const handleDelete = async () => {
                dispatch({ type: "DELETE", id })
                if (__typename) {
                        await deleteColor({
                                variables: { id }
                        })
                }
        }

        return (
                <div className={styles.wrapper}>
                        <div
                                className={styles.color}
                                onClick={handleShow}
                                onKeyPress={handleKeyPress}
                                style={{ backgroundColor: code ?? "" }}>
                                {show
                                        ?
                                        <BlockPicker
                                                colors={[
                                                        '#000000',
                                                        '#ffffff',
                                                        '#898989',
                                                        '#ff002b',
                                                        '#ffde00',
                                                        '#ff8400',
                                                        '#50bc00',
                                                        '#003cff',
                                                        '#edd3a9',
                                                        '#ba00ff',
                                                        '#c345b9',
                                                        '#8f5e10',
                                                        '#003688',
                                                        '#530105',
                                                        '#BC8AC2',
                                                        '#806062',
                                                        '#C49DB4',
                                                        '#4B5320',
                                                        '#FFC3B1',
                                                        '#E8909C',
                                                ]}
                                                className={styles.picker}
                                                color={code ?? ""}
                                                triangle={!isServer() && window.screen.width > 640 ? "top" : "hide"}
                                                onChangeComplete={handleChangeColor}
                                        />
                                        : null
                                }
                        </div>
                        <Input
                                className={styles.field}
                                value={name ?? ""} onChange={handleChangeName}
                                placeholder="color name" />
                        <BsFillTrashFill className={styles.delete} onClick={handleDelete} />
                </div>
        );
}