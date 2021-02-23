import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../../components/InputField";
import { withApollo } from "../../utils/withApollo";

const Login: React.FC<{}> = ({}) => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-300">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
            console.log(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-8 md:rounded-lg bg-white w-screen h-screen flex-none md:max-w-md md:max-h-80 min-w-min flex flex-col">
            <h1 className="text-center text-2xl font-semibold">Login</h1>
            <InputField
              name="email"
              placeholder="email"
              label="Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={5}
              ml="auto"
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withApollo({ ssr: false })(Login);