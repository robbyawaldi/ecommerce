import React, { useEffect, useMemo, useReducer, useState } from 'react'
import form from '../../styles/Form.module.css'
import card from '../../styles/Card.module.css'
import upload from '../../styles/Upload.module.css'
import { Box, FormControl, FormLabel, Input, Checkbox, Button, InputGroup, InputRightAddon, NumberInput, NumberInputField } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { InputField } from './InputField';
import { useCategoriesQuery, useProductQuery, useSizesQuery, useUpdateProductMutation } from '../../generated/graphql';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import { imageReducer } from './imageReducer';
import { UploadImage } from './UploadImage';
import { ProductImage } from '../../types/images';
import { toErrorMap } from '../../utils/toErrorMap';
import { Item } from '../../types/item';
import { Multiselect } from './Multiselect';
import { calculateDiscount } from '../../utils/discount';
import { colorReducer } from './colorReducer';
import { ProductColor } from '../../types/colors';
import { ColorPicker } from './ColorPicker';
import { priceSizeReducer } from './priceSizeReducer';
import { PriceSize } from './PriceSize';
import { ProductPriceSize } from '../../types/priceSizes';

interface EditProductProps { }

export const EditProduct: React.FC<EditProductProps> = ({ }) => {
    const router = useRouter()
    const id = useMemo(() => router.query.id, [router.query])
    const [updateProduct] = useUpdateProductMutation()
    const { data, error, loading } = useProductQuery({
        variables: {
            id: id as string
        },
        notifyOnNetworkStatusChange: true
    })
    const { data: sizes, error: sizeError, loading: sizeLoading } = useSizesQuery()
    const { data: categories, error: categoryError, loading: categoryLoading } = useCategoriesQuery({
        variables: {
            level: 1
        }
    })
    const [selectedSizes, setSelectedSizes] = useState<Item[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Item[]>([]);

    const [{ images }, imageDispatch] = useReducer(imageReducer, { images: [] })
    const [{ colors }, colorDispatch] = useReducer(colorReducer, { colors: [] })
    const [{ priceSizes }, priceDispatch] = useReducer(priceSizeReducer, { priceSizes: [] })

    useEffect(() => {
        if (data?.product?.images) {
            imageDispatch({ type: "SET", images: data.product.images as ProductImage[] })
        }

        if (data?.product?.colors) {
            colorDispatch({ type: "SET", colors: data.product.colors as ProductColor[] })
        }

        if (data?.product?.priceSizes) {
            priceDispatch({ type: "SET", priceSizes: data.product.priceSizes as ProductPriceSize[] })
        }

        if (data?.product?.sizes && data.product.sizes.length > 0) {
            setSelectedSizes(data.product.sizes)
        }

        if (data?.product?.categories && data.product.categories.length > 0) {
            setSelectedCategories(data.product.categories)
        }
    }, [data])

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) {
        return errorMessage
    }

    const errorSizeMessage = loadingOrQueryFailed({ data: sizes, error: sizeError, loading: sizeLoading })
    if (errorSizeMessage) {
        return errorSizeMessage
    }

    const errorCategoryMessage = loadingOrQueryFailed({ data: categories, error: categoryError, loading: categoryLoading })
    if (errorCategoryMessage) {
        return errorCategoryMessage
    }

    return (
        <section className={`${card.box} md:max-w-md`}>
            <h1 className={card.title}>Edit Product</h1>
            <Formik
                initialValues={{
                    title: data?.product?.title ?? "",
                    description: data?.product?.description ?? "",
                    detail: data?.product?.detail ?? "",
                    price: data?.product?.price ?? 0,
                    stockAvailable: data?.product?.stockAvailable ?? true,
                    isExclusive: data?.product?.isExclusive ?? false,
                    isDiscount: data?.product?.isDiscount ?? false,
                    discount: data?.product?.discount ?? 0,
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    const response = await updateProduct({
                        variables: {
                            id: id as string,
                            images: images
                                .filter(image =>
                                    image.image !== undefined
                                    && !image.__typename)
                                .map(image => ({ image: image.image as string })),
                            colors: colors
                                .filter(color =>
                                    color.name !== undefined
                                    && !color.__typename)
                                .map(color => ({ code: color.code as string, name: color.name as string })),
                            priceSizes: priceSizes
                                .filter(priceSize =>
                                    priceSize.price !== 0
                                    && priceSize.sizeId !== undefined
                                    && !priceSize.__typename)
                                .map(priceSize => ({ sizeId: priceSize.sizeId as number, price: priceSize.price as number })),
                            categories: selectedCategories.map((category: Item) => category.id),
                            sizes: selectedSizes.map((size: Item) => size.id),
                            ...values
                        },
                    })

                    if (response.data?.updateProduct.errors) {
                        setErrors(toErrorMap(response.data.updateProduct.errors))
                    } else {
                        resetForm({})
                        router.back()
                    }
                }}>
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form className={form.form}>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="Title" />
                        <Box mt={4}>
                            <InputField
                                name="description"
                                placeholder="description"
                                label="Description" />
                        </Box>
                        <div className="grid grid-cols-3 mt-4 justify-items-center">
                            <Checkbox
                                name="isExclusive"
                                defaultChecked={values.isExclusive}
                                checked={values.isExclusive}
                                onChange={(e) => setFieldValue('isExclusive', e.currentTarget.checked)}>
                                Exclusive
                            </Checkbox>
                            <Checkbox
                                name="isDiscount"
                                defaultChecked={values.isDiscount}
                                checked={values.isDiscount}
                                onChange={(e) => setFieldValue('isDiscount', e.currentTarget.checked)}>
                                Discount
                            </Checkbox>
                            <Checkbox
                                name="stockAvailable"
                                defaultChecked={values.stockAvailable}
                                checked={values.stockAvailable}
                                onChange={(e) => setFieldValue('stockAvailable', e.currentTarget.checked)}>
                                Stock Available
                            </Checkbox>
                        </div>
                        <div className={`grid gap-2 grid-cols-${values.isDiscount ? 2 : 0} mt-4 justify-items-center`}>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    name="price"
                                    onChange={(e) => {
                                        const nominal = e.currentTarget.value.replace(/[^\d]/g, "")
                                        return setFieldValue('price', parseInt(nominal))
                                    }}
                                    value={toRupiah(isNaN(values.price) ? 0 : values.price, { floatingPoint: 0 })}
                                />
                            </FormControl>
                            {values.isDiscount
                                ? (
                                    <>
                                        <FormControl>
                                            <FormLabel>Discount</FormLabel>
                                            <NumberInput
                                                name="discount"
                                                value={isNaN(values.discount) ? 0 : values.discount}
                                                onChange={(e) => setFieldValue('discount', parseInt(e))}>
                                                <InputGroup>
                                                    <NumberInputField className={form.input} />
                                                    <InputRightAddon children="%" />
                                                </InputGroup>
                                            </NumberInput>
                                        </FormControl>
                                        <FormControl className="col-span-2">
                                            <FormLabel>Post-Discount Price</FormLabel>
                                            <Input
                                                disabled
                                                value={toRupiah(isNaN(values.price)
                                                    ? 0
                                                    : calculateDiscount({ price: values.price, discount: values.discount }),
                                                    { floatingPoint: 0 })}
                                            />
                                        </FormControl>
                                    </>
                                ) : null}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4 justify-items-end">
                            <FormControl>
                                <FormLabel>Sizes</FormLabel>
                                <Multiselect
                                    items={sizes?.sizes as Item[]}
                                    selectedItems={selectedSizes}
                                    setSelected={setSelectedSizes} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Categories</FormLabel>
                                <Multiselect
                                    items={categories?.categories as Item[]}
                                    selectedItems={selectedCategories}
                                    setSelected={setSelectedCategories} />
                            </FormControl>
                        </div>
                        <Box mt={4}>
                            <FormControl>
                                <FormLabel>
                                    Price per Size
                                    <Button size="xs" ml={3} onClick={() => priceDispatch({ type: "ADD" })}>Add Price</Button>
                                </FormLabel>
                                {priceSizes.map((price, i) => (
                                    <PriceSize
                                        key={i}
                                        priceSize={price}
                                        dispatch={priceDispatch}
                                        selectedSizes={selectedSizes}
                                    />
                                ))}
                            </FormControl>
                        </Box>
                        <Box mt={4}>
                            <FormControl>
                                <FormLabel>
                                    Colors
                                    <Button size="xs" ml={3} onClick={() => colorDispatch({ type: "ADD" })}>Add Color</Button>
                                </FormLabel>
                                {colors.map((color, i) => (
                                    <ColorPicker
                                        key={i}
                                        color={color}
                                        dispatch={colorDispatch}
                                    />
                                ))}
                            </FormControl>
                        </Box>
                        <Box mt={4}>
                            <InputField
                                rich
                                name="detail"
                                label="Detail" />
                        </Box>

                        <div className={`${upload.uploadImageContainer}`}>
                            {images.map((image, i) => (
                                <UploadImage
                                    key={i}
                                    image={image}
                                    dispatch={imageDispatch} />
                            ))}
                        </div>

                        <Button
                            mt={5}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal">
                            Edit
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}