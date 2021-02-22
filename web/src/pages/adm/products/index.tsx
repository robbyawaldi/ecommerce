import React from 'react'
import { AdmLayout } from '../../../components/AdmLayout';
import { withApollo } from '../../../utils/withApollo';

const Products = () => {
    return (
        <AdmLayout>
            products management
        </AdmLayout>
    )
}

export default withApollo({ ssr: true })(Products)