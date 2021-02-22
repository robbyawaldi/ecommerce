import React from 'react'
import { AdmLayout } from '../../../components/AdmLayout';
import { withApollo } from '../../../utils/withApollo';

const Users = () => {
    return (
        <AdmLayout>
            users management
        </AdmLayout>
    )
}

export default withApollo({ ssr: true })(Users)