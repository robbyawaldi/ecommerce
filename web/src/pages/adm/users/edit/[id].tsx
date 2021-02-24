import React from 'react'
import { AdmLayout } from '../../../../components/AdmLayout'
import { BackButton } from '../../../../components/BackButton'
import { EditUser } from '../../../../components/EditUser'
import { withApollo } from '../../../../utils/withApollo'

const User = () => {
    return (
        <AdmLayout>
            <BackButton />
            <EditUser />
        </AdmLayout>
    )
}

export default withApollo({ ssr: true })(User)