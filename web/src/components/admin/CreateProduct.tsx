import { Form, Formik } from 'formik';
import React, { useReducer } from 'react'
import form from '../../styles/Form.module.css'
import card from '../../styles/Card.module.css'
import { InputField } from './InputField';
import { Box, Button, Checkbox, FormControl, FormLabel, Input } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import { ProductsDocument, useCreateProductMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { UploadImage } from './UploadImage';
import styles from '../../styles/CreateProduct.module.css'
import { Action, ProductImage, State } from '../../types/images';
import { randomId } from '../../utils/randomId';

interface CreateProductProps { }

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "ADD":
            return {
                images: [...state.images, { id: randomId(), image: undefined, url: undefined }]
            }
        case "UPDATE":
            return {
                images: state.images.map((image: ProductImage) =>
                    image.id === action.id
                        ? { ...image, image: action.image, url: action.url }
                        : image)
            }
        case "DELETE":
            return {
                images: state.images.filter((image: ProductImage) => image.id !== action.id)
            }
        default:
            return state
    }
}

export const CreateProduct: React.FC<CreateProductProps> = ({ }) => {
    const [product] = useCreateProductMutation()
    const router = useRouter()
    const [{ images }, dispatch] = useReducer(reducer, {
        images: [
            { id: randomId(), image: undefined, url: undefined }
        ]
    })

    return (
        <section className={`${card.box} md:max-w-md`}>
            <h1 className={card.title}>Add Product</h1>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    price: 0,
                    stockAvailable: true
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    const response = await product({
                        variables: {
                            ...values,
                            images: images.filter(image => image.image !== undefined).map(image => ({image: image.image as string}))
                        },
                        refetchQueries: [
                            {
                                query: ProductsDocument
                            }
                        ]
                    })
                    resetForm({})
                    router.back()
                }}>
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form className={form.form}>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="Title" />
                        <Box mt={4}>
                            <InputField
                                textarea
                                name="description"
                                placeholder="description"
                                label="Description" />
                        </Box>
                        <div className="grid grid-cols-2 gap-2 justify-items-end">
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
                                name="stockAvailabe"
                                defaultChecked
                                checked={values.stockAvailable}
                                onChange={(e) => setFieldValue('stockAvailabe', e.currentTarget.checked)}>
                                Stock Available
                            </Checkbox>
                        </div>

                        <div className={`${styles.uploadImageContainer}`}>
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
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}