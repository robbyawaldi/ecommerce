import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../../components/admin/InputField";
import { withApollo } from "../../utils/withApollo";
import { MeDocument, MeQuery, useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRouter } from "next/router";
import styles from '../../styles/Login.module.css'

const Login: React.FC<{}> = ({ }) => {
  const router = useRouter()
  const [login] = useLoginMutation()

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.login.user
                }
              })
            }
          })

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              // worked
              router.push("/adm");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <h1 className={styles.title}>Login</h1>
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