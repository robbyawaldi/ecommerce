import { Box, Select, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import { InputField } from './InputField';

interface EditUserProps { }

export const EditUser: React.FC<EditUserProps> = ({ }) => {
    // const router = useRouter()
    // const id = router.query.id

    // console.log(id)

    return (
        <section className="bg-white w-full rounded-md p-5 shadow-lg my-5 max-w-md">
            <h1 className="text-lg border-b-2 h-10">Edit User</h1>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    roleId: 2
                }}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values)
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
                            Edit
                            </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}