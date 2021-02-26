import React from 'react'
import { AdmLayout } from '../../../../components/admin/AdmLayout'
import { BackButton } from '../../../../components/admin/BackButton'
import { EditUser } from '../../../../components/admin/EditUser'
import { useIsAuth } from '../../../../utils/useIsAuth'
import { withApollo } from '../../../../utils/withApollo'

const User = () => {
    useIsAuth()

    return (
        <AdmLayout>
            <BackButton />
            <EditUser />
        </AdmLayout>
    )
}

export default withApollo({ ssr: true })(User)