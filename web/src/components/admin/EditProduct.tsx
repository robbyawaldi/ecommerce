import React from 'react'
import form from '../../styles/Form.module.css'
import card from '../../styles/Card.module.css'
import { Box, FormControl, FormLabel, Input, Checkbox, Button } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { InputField } from './InputField';
import { useProductQuery, useUpdateProductMutation } from '../../generated/graphql';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';

interface EditProductProps { }

export const EditProduct: React.FC<EditProductProps> = ({ }) => {
    const router = useRouter()
    const id = React.useMemo(() => router.query.id, [router.query])
    const [updateProduct] = useUpdateProductMutation()
    const { data, error, loading } = useProductQuery({
        variables: {
            id: id as string
        },
        notifyOnNetworkStatusChange: true
    })

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
                            ...values
                        },
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