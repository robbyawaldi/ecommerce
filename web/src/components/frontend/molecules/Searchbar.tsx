import { IconButton } from '@chakra-ui/button'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import styles from '../../../styles/frontend/Searchbar.module.css'

interface SearchbarProps { }

export const Searchbar: React.FC<SearchbarProps> = ({ }) => {
    const router = useRouter()

    return (
        <Formik
            initialValues={{
                keyword: router.query.keyword ?? ''
            }}
            onSubmit={async (values) => {
                router.push({
                    pathname: '/search',
                    query: {
                        keyword: values.keyword
                    }
                })
            }}>
            {({ values, handleChange, handleBlur }) => (
                <Form className={styles.searchBox}>
                    <input
                        name="keyword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.keyword}
                        className="w-full"
                        type="text"
                        placeholder="Cari..."
                        autoComplete="off" />
                    <IconButton
                        type="submit"
                        className={styles.searchButton}
                        aria-label="Search"
                        size="sm"
                        icon={<BiSearch color="white" />}
                    />
                </Form>
            )}
        </Formik>
    );
}