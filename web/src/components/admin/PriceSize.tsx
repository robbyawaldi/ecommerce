import React from 'react'
import { useDeletePriceSizeMutation } from '../../generated/graphql';
import { Item } from '../../types/item';
import { PriceSizeAction, ProductPriceSize } from '../../types/priceSizes';
import styles from '../../styles/PriceSize.module.css'
import { Input, Select } from '@chakra-ui/react';
import { BsFillTrashFill } from 'react-icons/bs';
import toRupiah from '@develoka/angka-rupiah-js';

interface PriceSizeProps {
    dispatch: React.Dispatch<PriceSizeAction>;
    priceSize: ProductPriceSize
    selectedSizes: Item[]
}

export const PriceSize: React.FC<PriceSizeProps> = ({ dispatch, priceSize: { id, sizeId, price, __typename }, selectedSizes }) => {
    const [deletePriceSize] = useDeletePriceSizeMutation()

    const handleChangePrice: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const nominal = e.currentTarget.value.replace(/[^\d]/g, "")
        dispatch({ type: "UPDATE", id, price: parseInt(nominal) })
    }

    const handleChangeSize: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        dispatch({ type: "UPDATE", id, sizeId: parseInt(e.currentTarget.value) })
    }

    const handleDelete = async () => {
        dispatch({ type: "DELETE", id })
        if (__typename) {
            await deletePriceSize({
                variables: { id }
            })
        }
    }

    return (
        <div className={styles.wrapper}>
            <Select onChange={handleChangeSize} value={sizeId ?? 0}>
                {selectedSizes.map(size => (
                    <option key={size.id} value={size.id}>{size.name}</option>
                ))}
            </Select>
            <Input
                className={styles.field}
                value={toRupiah(price ? price : 0, { floatingPoint: 0 })}
                onChange={handleChangePrice}
                placeholder="price" />
            <BsFillTrashFill className={styles.delete} onClick={handleDelete} />
        </div>
    );
}