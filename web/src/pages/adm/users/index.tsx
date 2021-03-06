import React from 'react'
import { Layout } from '../../../components/admin/Layout';
import { CreateUser } from '../../../components/admin/CreateUser';
import { UserList } from '../../../components/admin/UserList';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';

const Users = () => {
    useIsAuth()
    
    return (
        <Layout>
            <h1 className="font-semibold text-lg">User Management</h1>
            <UserList />
            <CreateUser />
        </Layout>
    )
}

export default withApollo({ ssr: true })(Users)