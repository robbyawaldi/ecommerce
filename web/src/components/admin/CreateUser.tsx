import { Box, Select, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react'
import { useRegisterMutation, UsersDocument } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { InputField } from './InputField';
import form from '../../styles/Form.module.css'
import card from '../../styles/Card.module.css'

interface CreateUserProps { }

export const CreateUser: React.FC<CreateUserProps> = ({ }) => {
    const [register] = useRegisterMutation()

    return (
        <section className={`${card.box} md:max-w-md`}>
            <h1 className={card.title}>Create New User</h1>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    roleId: 2
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    const response = await register({
                        variables: values,
                        refetchQueries: [
                            {
                                query: UsersDocument,
                                variables: { limit: 5 }
                            }
                        ]
                    });
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    }
                    else {
                        resetForm({})
                    }
                }}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className={form.form}>
                        <InputField
                            name="name"
                            placeholder="name"
                            label="Name"
                        />
                        <Box mt={4}>
                            <InputField
                                name="email"
                                placeholder="email"
                                label="Email"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <FormControl mt={4}>
                            <FormLabel>Role</FormLabel>
                            <Select
                                name="roleId"
                                aria-label="role"
                                placeholder="Role"
                                onChange={(opt) => {
                                    setFieldValue('roleId', opt.currentTarget.value)
                                }}>
                                <option value={1}>Admin</option>
                                <option value={2}>Data Entry</option>
                            </Select>
                        </FormControl>
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
