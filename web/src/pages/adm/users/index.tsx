import React from 'react'
import { AdmLayout } from '../../../components/admin/AdmLayout';
import { CreateUser } from '../../../components/admin/CreateUser';
import { UserList } from '../../../components/admin/UserList';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';

const Users = () => {
    useIsAuth()
    
    return (
        <AdmLayout>
            <h1 className="font-semibold text-lg">User Management</h1>
            <UserList />
            <CreateUser />
        </AdmLayout>
    )
}

export default withApollo({ ssr: true })(Users)