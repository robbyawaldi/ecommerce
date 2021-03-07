import React from 'react'
import { BackButton } from '../../../components/admin/BackButton';
import { Layout } from '../../../components/admin/Layout';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';

const NewProduct = () => {
    useIsAuth()

    return (
        <Layout>
            <BackButton />
            <h1 className="font-semibold text-lg">Add New Product</h1>
        </Layout>
    )
}

export default withApollo({ ssr: true })(NewProduct)