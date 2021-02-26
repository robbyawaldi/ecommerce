import { Box, Select, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react'
import { useRegisterMutation, UsersDocument } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { InputField } from './InputField';

interface CreateUserProps { }

export const CreateUser: React.FC<CreateUserProps> = ({ }) => {
    const [register] = useRegisterMutation()

    return (
        <section className="bg-white w-full rounded-md p-5 shadow-lg my-5 max-w-md">
            <h1 className="text-lg border-b-2 h-10">Create New User</h1>
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
                {({ isSubmitting }) => (
                    <Form className="mt-3 md:max-w-md min-w-min flex flex-col">
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
                            <Select name="roleId" aria-label="role" placeholder="Role">
                                <option value={1}>Admin</option>
                                <option value={2}>Data Entry</option>
                            </Select>
                        </FormControl>
                        <Button
                            mt={5}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            create
                            </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}
