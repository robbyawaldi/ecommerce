import React from 'react'
import { Layout } from '../../../../components/admin/Layout'
import { BackButton } from '../../../../components/admin/BackButton'
import { EditUser } from '../../../../components/admin/EditUser'
import { useIsAuth } from '../../../../utils/useIsAuth'
import { withApollo } from '../../../../utils/withApollo'

const User = () => {
    useIsAuth()

    return (
        <Layout>
            <BackButton />
            <EditUser />
        </Layout>
    )
}

export default withApollo({ ssr: true })(User)