import { Form, Formik } from 'formik';
import React, { useReducer, useState } from 'react'
import form from '../../styles/Form.module.css'
import card from '../../styles/Card.module.css'
import { InputField } from './InputField';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import { ProductsDocument, useCreateProductMutation, useSizesQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { UploadImage } from './UploadImage';
import upload from '../../styles/Upload.module.css'
import { randomId } from '../../utils/randomId';
import { reducer } from './imageReducer';
import { toErrorMap } from '../../utils/toErrorMap';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import { Multiselect } from './Multiselect';
import { Item } from '../../types/item';

interface CreateProductProps { }

export const CreateProduct: React.FC<CreateProductProps> = ({ }) => {
    const [product] = useCreateProductMutation()
    const { data, error, loading } = useSizesQuery()
    const router = useRouter()
    const [selectedSizes, setSelectedSizes] = useState<Item[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Item[]>([]);
    const [{ images }, dispatch] = useReducer(reducer, {
        images: [
            { id: randomId(), image: undefined, url: undefined }
        ]
    })

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) {
        return errorMessage
    }

    return (
        <section className={`${card.box} md:max-w-md`}>
            <h1 className={card.title}>Add Product</h1>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    price: 0,
                    stockAvailable: true,
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
                        <div className="grid grid-cols-2 gap-2 mt-4 justify-items-end">
                            <FormControl>
                                <FormLabel>Sizes</FormLabel>
                                <Multiselect
                                    items={data?.sizes as Item[]}
                                    selectedItems={selectedSizes}
                                    setSelected={setSelectedSizes} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Categories</FormLabel>
                                <Multiselect
                                    items={[{ id: 1, name: 'Gamis' }, { id: 2, name: 'Rok' }, { id: 3, name: 'celana panjang rumbe-rumbe' }] as Item[]}
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
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}