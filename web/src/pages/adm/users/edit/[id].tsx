import React from 'react'
import { AdmLayout } from '../../../../components/AdmLayout'
import { BackButton } from '../../../../components/BackButton'
import { EditUser } from '../../../../components/EditUser'
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