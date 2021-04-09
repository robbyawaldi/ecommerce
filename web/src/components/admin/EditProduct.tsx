import React, { useEffect, useMemo, useReducer, useState } from 'react'
import form from '../../styles/Form.module.css'
import card from '../../styles/Card.module.css'
import upload from '../../styles/Upload.module.css'
import { Box, FormControl, FormLabel, Input, Checkbox, Button } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { InputField } from './InputField';
import { useCategoriesQuery, useProductQuery, useSizesQuery, useUpdateProductMutation } from '../../generated/graphql';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import { reducer } from './imageReducer';
import { UploadImage } from './UploadImage';
import { ProductImage } from '../../types/images';
import { toErrorMap } from '../../utils/toErrorMap';
import { Item } from '../../types/item';
import { Multiselect } from './Multiselect';

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
    const [{ images }, dispatch] = useReducer(reducer, { images: [] })

    useEffect(() => {
        if (data?.product?.images) {
            dispatch({ type: "SET", images: data.product.images as ProductImage[] })
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
                    title: data?.product?.title,
                    description: data?.product?.description,
                    price: data?.product?.price ?? 0,
                    stockAvailable: data?.product?.stockAvailable,
                    isExclusive: data?.product?.isExclusive,
                    isDiscount: data?.product?.isDiscount,
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
                        <FormControl mt={4}>
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
                            <InputField
                                rich
                                name="description"
                                label="Description" />
                        </Box>

                        <div className={`${upload.uploadImageContainer}`}>
                            {images.map((image, i) => (
                                <UploadImage
                                    key={i}
                                    image={image}
                                    dispatch={dispatch} />
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