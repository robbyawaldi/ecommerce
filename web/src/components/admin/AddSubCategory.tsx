import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { CategoriesDocument, useAddCategoryChildMutation, useCategoryQuery } from '../../generated/graphql'
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed'
import card from '../../styles/Card.module.css'
import form from '../../styles/Form.module.css'
import { Form, Formik } from 'formik'
import { toErrorMap } from '../../utils/toErrorMap'
import { InputField } from './InputField'
import { Button } from '@chakra-ui/react'

interface AddSubCategoryProps { }

export const AddSubCategory: React.FC<AddSubCategoryProps> = ({ }) => {
    const router = useRouter()
    const id = useMemo(() => router.query.id, [router.query])
    const [addSubCategory] = useAddCategoryChildMutation()
    const { data, error, loading } = useCategoryQuery({
        variables: {
            id: parseInt(id as string)
        }
    })

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) return errorMessage

    return (
        <section className={`${card.box} md:max-w-md`}>
            <h1 className={card.title}>Add Sub Category For <span className="italic font-bold">{data?.category?.name}</span></h1>
            <Formik
                initialValues={{
                    name: ""
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    const response = await addSubCategory({
                        variables: {
                            parentId: parseInt(id as string),
                            ...values
                        },
                        refetchQueries: [
                            {
                                query: CategoriesDocument
                            }
                        ]
                    })
                    if (response.data?.addCategoryChild.errors) {
                        setErrors(toErrorMap(response.data.addCategoryChild.errors))
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
                            Add
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}