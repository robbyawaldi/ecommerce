import React from 'react'
import { BackButton } from '../../../components/admin/BackButton';
import { CreateProduct } from '../../../components/admin/CreateProduct';
import { Layout } from '../../../components/admin/Layout';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';

const NewProduct = () => {
    useIsAuth()

    return (
        <Layout>
            <BackButton />
            <CreateProduct />
        </Layout>
    )
}

export default withApollo({ ssr: false })(NewProduct)