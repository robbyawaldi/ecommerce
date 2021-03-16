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
import upload from '../../styles/Upload.module.css'
import { randomId } from '../../utils/randomId';
import { reducer } from './imageReducer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toErrorMap } from '../../utils/toErrorMap';

interface CreateProductProps { }

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
                            images: images
                                .filter(image => image.image !== undefined)
                                .map(image => ({ image: image.image as string }))
                        },
                        refetchQueries: [
                            {
                                query: ProductsDocument
                            }
                        ]
                    })

                    if (response.data?.createProduct.errors) {
                        setErrors(toErrorMap(response.data.createProduct.errors))
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
                                name="stockAvailabe"
                                defaultChecked
                                checked={values.stockAvailable}
                                onChange={(e) => setFieldValue('stockAvailabe', e.currentTarget.checked)}>
                                Stock Available
                            </Checkbox>
                        </div>
                        <Box mt={4}>
                            <ReactQuill
                                placeholder="description"
                                value={values.description}
                                onChange={value => setFieldValue('description', value)} />
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
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}