import { Form, Formik } from 'formik';
import React from 'react'
import form from '../../styles/Form.module.css'
import card from '../../styles/Card.module.css'
import { InputField } from './InputField';
import { Box, Button, Checkbox, FormControl, FormLabel, Input } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import { ProductsDocument, useProductMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

interface CreateProductProps { }

export const CreateProduct: React.FC<CreateProductProps> = ({ }) => {
    const [product] = useProductMutation()
    const router = useRouter()

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
                        variables: values,
                        refetchQueries: [
                            {
                                query: ProductsDocument
                            }
                        ]
                    })

                    console.log(response.data?.product)
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
                        <Button
                            mt={5}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal">
                            create
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}