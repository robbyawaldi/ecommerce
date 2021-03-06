import React from 'react'
import { AdmLayout } from '../../../components/admin/AdmLayout';
import { ProductList } from '../../../components/admin/ProductList';
import { ProductTools } from '../../../components/admin/ProductTools';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';

const Products = () => {
    useIsAuth()

    return (
        <AdmLayout>
            <h1 className="font-semibold text-lg">Product Management</h1>
            <ProductTools />
            <ProductList />
        </AdmLayout>
    )
}

export default withApollo({ ssr: true })(Products)