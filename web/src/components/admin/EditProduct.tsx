import React, { useEffect, useMemo, useReducer } from 'react'
import form from '../../styles/Form.module.css'
import card from '../../styles/Card.module.css'
import upload from '../../styles/Upload.module.css'
import { Box, FormControl, FormLabel, Input, Checkbox, Button } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { InputField } from './InputField';
import { useProductQuery, useUpdateProductMutation } from '../../generated/graphql';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import { reducer } from './imageReducer';
import { UploadImage } from './UploadImage';
import { ProductImage } from '../../types/images';
import { toErrorMap } from '../../utils/toErrorMap';

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
    const [{ images }, dispatch] = useReducer(reducer, { images: [] })

    useEffect(() => {
        if (data?.product?.images) {
            dispatch({ type: "SET", images: data.product.images as ProductImage[] })
        }
    }, [data])

    const errorMessage = loadingOrQueryFailed(data, loading, error)
    if (errorMessage) {
        return errorMessage
    }

    return (
        <section className={`${card.box} md:max-w-md`}>
            <h1 className={card.title}>Edit Product</h1>
            <Formik
                initialValues={{
                    title: data?.product?.title,
                    description: data?.product?.description,
                    price: data?.product?.price ?? 0,
                    stockAvailable: data?.product?.stockAvailable
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
                        <div className="grid grid-cols-2 gap-2 mt-4 justify-items-end">
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
                            <Checkbox
                                name="stockAvailable"
                                defaultChecked={values.stockAvailable}
                                checked={values.stockAvailable}
                                onChange={(e) => setFieldValue('stockAvailable', e.currentTarget.checked)}>
                                Stock Available
                            </Checkbox>
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