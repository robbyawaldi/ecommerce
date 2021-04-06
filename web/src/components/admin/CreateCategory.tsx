import { Button } from '@chakra-ui/button'
import { Form, Formik } from 'formik'
import React from 'react'
import { CategoriesDocument, useCreateCategoryMutation } from '../../generated/graphql'
import card from '../../styles/Card.module.css'
import form from '../../styles/Form.module.css'
import { toErrorMap } from '../../utils/toErrorMap'
import { InputField } from './InputField'

interface CreateCategoryProps { }

export const CreateCategory: React.FC<CreateCategoryProps> = ({ }) => {
    const [category] = useCreateCategoryMutation()

    return (
        <section className={`${card.box}`}>
            <h1 className={card.title}>Create New Category</h1>
            <Formik
                initialValues={{
                    name: ""
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    const response = await category({
                        variables: values,
                        refetchQueries: [
                            {
                                query: CategoriesDocument
                            }
                        ]
                    })

                    if (response.data?.createCategory.errors) {
                        setErrors(toErrorMap(response.data.createCategory.errors))
                    } else resetForm({})
                }}>
                {({ isSubmitting }) => (
                    <Form className={form.form}>
                        <InputField
                            name="name"
                            placeholder="name"
                            label="name"
                        />
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