import { Form, Formik } from 'formik';
import React, { useReducer, useState } from 'react'
import form from '../../styles/Form.module.css'
import card from '../../styles/Card.module.css'
import { InputField } from './InputField';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, InputGroup, InputRightAddon, NumberInput, NumberInputField } from '@chakra-ui/react';
import toRupiah from '@develoka/angka-rupiah-js';
import { ProductsDocument, useCategoriesQuery, useCreateProductMutation, useSizesQuery } from '../../generated/graphql';
import { useRouter } from 'next/router';
import { UploadImage } from './UploadImage';
import upload from '../../styles/Upload.module.css'
import { randomId } from '../../utils/randomId';
import { reducer } from './imageReducer';
import { toErrorMap } from '../../utils/toErrorMap';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import { Multiselect } from './Multiselect';
import { Item } from '../../types/item';
import { LIMIT_PAGE_ADMIN } from '../../static/products';
import { calculateDiscount } from '../../utils/discount';
import { BlockPicker } from 'react-color'
import { ColorPicker } from './ColorPicker';

interface CreateProductProps { }

export const CreateProduct: React.FC<CreateProductProps> = ({ }) => {
    const router = useRouter();
    const [product] = useCreateProductMutation();
    const { data: sizes, error: sizeError, loading: sizeLoading } = useSizesQuery();
    const { data: categories, error: categoryError, loading: categoryLoading } = useCategoriesQuery({
        variables: {
            level: 1
        }
    });
    const [selectedSizes, setSelectedSizes] = useState<Item[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Item[]>([]);
    const [{ images }, dispatch] = useReducer(reducer, {
        images: [
            { id: randomId(), image: undefined, url: undefined }
        ]
    });

    const errorSizeMessage = loadingOrQueryFailed({ data: sizes, error: sizeError, loading: sizeLoading });
    if (errorSizeMessage) return errorSizeMessage;

    const errorCategoryMessage = loadingOrQueryFailed({ data: categories, error: categoryError, loading: categoryLoading });
    if (errorCategoryMessage) return errorCategoryMessage;

    return (
        <section className={`${card.box} md:max-w-md`}>
            <h1 className={card.title}>Add Product</h1>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    detail: '',
                    price: 0,
                    discount: 0,
                    stockAvailable: true,
                    isExclusive: false,
                    isDiscount: false,
                    isMalikha: false,
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    const response = await product({
                        variables: {
                            ...values,
                            images: images
                                .filter(image => image.image !== undefined)
                                .map(image => ({ image: image.image as string })),
                            categories: selectedCategories.map((category: Item) => category.id),
                            sizes: selectedSizes.map((size: Item) => size.id),
                        },
                        refetchQueries: [
                            {
                                query: ProductsDocument,
                                variables: {
                                    page: 1,
                                    limit: LIMIT_PAGE_ADMIN
                                }
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
                        <Box mt={4}>
                            <InputField
                                name="description"
                                placeholder="description"
                                label="Description" />
                        </Box>
                        <div className="grid grid-cols-4 mt-4 justify-items-center">
                            <Checkbox
                                name="isExclusive"
                                checked={values.isExclusive}
                                onChange={(e) => setFieldValue('isExclusive', e.currentTarget.checked)}>
                                Exclusive
                            </Checkbox>
                            <Checkbox
                                name="isDiscount"
                                checked={values.isDiscount}
                                onChange={(e) => setFieldValue('isDiscount', e.currentTarget.checked)}>
                                Discount
                            </Checkbox>
                            <Checkbox
                                name="stockAvailabe"
                                defaultChecked
                                checked={values.stockAvailable}
                                onChange={(e) => setFieldValue('stockAvailabe', e.currentTarget.checked)}>
                                Stock
                            </Checkbox>
                            <Checkbox
                                name="isMalikha"
                                checked={values.isMalikha}
                                onChange={(e) => setFieldValue('isMalikha', e.currentTarget.checked)}>
                                Malikha
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
                                <FormLabel>Colors</FormLabel>
                                <ColorPicker />
                                <ColorPicker />
                                <ColorPicker />
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