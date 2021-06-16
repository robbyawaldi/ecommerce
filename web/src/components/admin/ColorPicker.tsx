import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Divider, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { BlockPicker, ColorResult } from 'react-color';
import styles from '../../styles/ColorPicker.module.css'
import { isServer } from '../../utils/isServer';
import { BsFillTrashFill } from 'react-icons/bs'
import { ColorAction, ProductColor } from '../../types/colors';
import { useDeleteColorMutation, useSizesQuery } from '../../generated/graphql';
import { Multiselect } from './Multiselect';
import { Item } from '../../types/item';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';

interface ColorPickerProps {
    dispatch: React.Dispatch<ColorAction>;
    color: ProductColor
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ dispatch, color: { id, code, name, exceptSizes, __typename } }) => {
    const [show, setShow] = useState(false)
    const [deleteColor] = useDeleteColorMutation()
    const { data: sizes, error: sizeError, loading: sizeLoading } = useSizesQuery();
    const [selectedSizes, setSelectedSizes] = useState<Item[]>([]);

    useEffect(() => {
        if (exceptSizes) {
            setSelectedSizes(exceptSizes)
        }

        document.body.addEventListener('mousedown', (e: MouseEvent) => {
            const targetClassName = (e.target as HTMLDivElement).offsetParent?.className ?? ""
            if (!targetClassName.includes('ColorPicker')) setShow(false)
        })
    }, [])

    useEffect(() => {
        dispatch({ type: "UPDATE", id, exceptSizes: selectedSizes })
    }, [selectedSizes])

    const handleChangeColor = (color: ColorResult) => {
        dispatch({ type: "UPDATE", id, code: color.hex })
    }

    const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        dispatch({ type: "UPDATE", id, name: e.target.value })
    }

    const handleShow: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.target == e.currentTarget) setShow(s => !s)
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

    const errorSizeMessage = loadingOrQueryFailed({ data: sizes, error: sizeError, loading: sizeLoading });
    if (errorSizeMessage) return errorSizeMessage;

    return (
        <Accordion allowMultiple>
            <AccordionItem className={styles.accordionItem}>
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
                    <AccordionButton className={styles.accordionButton}>
                        <AccordionIcon />
                    </AccordionButton>
                    <BsFillTrashFill className={styles.delete} onClick={handleDelete} />
                </div>

                <AccordionPanel className="grid">
                    <FormControl>
                        <FormLabel>Except for Size</FormLabel>
                        <Multiselect
                            items={sizes?.sizes as Item[]}
                            selectedItems={selectedSizes}
                            setSelected={setSelectedSizes} />
                    </FormControl>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}