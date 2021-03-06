import React from 'react'
import { Layout } from '../../../components/admin/Layout';
import { ProductList } from '../../../components/admin/ProductList';
import { ProductTools } from '../../../components/admin/ProductTools';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';

const Products = () => {
    useIsAuth()

    return (
        <Layout>
            <h1 className="font-semibold text-lg">Product Management</h1>
            <ProductTools />
            <ProductList />
        </Layout>
    )
}

export default withApollo({ ssr: true })(Products)