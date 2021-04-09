import { useRouter } from 'next/router';
import React, { useMemo } from 'react'
import { CategoriesDocument, useCategoryQuery, useUpdateCategoryMutation } from '../../generated/graphql';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';
import card from '../../styles/Card.module.css'
import form from '../../styles/Form.module.css'
import { Form, Formik } from 'formik';
import { toErrorMap } from '../../utils/toErrorMap';
import { InputField } from './InputField';
import { Button } from '@chakra-ui/react';

interface EditCategoryProps { }

export const EditCategory: React.FC<EditCategoryProps> = ({ }) => {
    const router = useRouter()
    const id = useMemo(() => router.query.id, [router.query])
    const [updateCategory] = useUpdateCategoryMutation()
    const { data, error, loading } = useCategoryQuery({
        variables: {
            id: parseInt(id as string)
        }
    })

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) return errorMessage
    return (
        <section className={`${card.box} md:max-w-md`}>
            <h1 className={card.title}>Edit Category</h1>
            <Formik
                initialValues={{
                    name: data?.category?.name || ""
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    const response = await updateCategory({
                        variables: {
                            id: parseInt(id as string),
                            ...values
                        },
                        refetchQueries: [
                            { query: CategoriesDocument }
                        ]
                    })
                    if (response.data?.updateCategory.errors) {
                        setErrors(toErrorMap(response.data.updateCategory.errors))
                    } else {
                        resetForm({})
                        router.replace('/adm/categories')
                    }
                }}>
                {({ isSubmitting }) => (
                    <Form className={form.form}>
                        <InputField
                            name="name"
                            placeholder="name"
                            label="Name"
                        />
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