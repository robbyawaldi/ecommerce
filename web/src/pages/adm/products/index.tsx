import React from 'react'
import { AdmLayout } from '../../../components/AdmLayout';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';

const Products = () => {
    useIsAuth()
    
    return (
        <AdmLayout>
            products management
        </AdmLayout>
    )
}

export default withApollo({ ssr: true })(Products)