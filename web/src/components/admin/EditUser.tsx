import { Box, Select, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react'
import { UsersDocument, useUpdateUserMutation, useUserQuery } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { InputField } from './InputField';
import form from '../../styles/Form.module.css';
import card from '../../styles/Card.module.css';
import { loadingOrQueryFailed } from '../../utils/loadingOrQueryFailed';

interface EditUserProps { }

export const EditUser: React.FC<EditUserProps> = ({ }) => {
    const router = useRouter()
    const id = useMemo(() => router.query.id, [router.query])
    const [updateUser] = useUpdateUserMutation()
    const { data, error, loading } = useUserQuery({
        variables: {
            id: id as string
        },
        notifyOnNetworkStatusChange: true
    })

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) return errorMessage

    return (
        <section className={`${card.box} md:max-w-md`}>
            <h1 className={card.title}>Edit User</h1>
            <Formik
                initialValues={{
                    name: data?.user?.name,
                    email: data?.user?.email,
                    password: "",
                    roleId: data?.user?.role.id
                }}
                onSubmit={async (values, { setErrors, resetForm }) => {
                    const response = await updateUser({
                        variables: {
                            id: id as string,
                            ...values
                        },
                        refetchQueries: [
                            { query: UsersDocument, variables: { limit: 5 } }
                        ]
                    })
                    if (response.data?.updateUser?.errors) {
                        setErrors(toErrorMap(response.data.updateUser.errors));
                    } else {
                        resetForm({})
                        router.replace('/adm/users')
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
                                label="New Password"
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
                                    setFieldValue('roleId', parseInt(opt.currentTarget.value))
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
                            Edit
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}