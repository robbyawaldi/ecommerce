import React from 'react'
import { AdmLayout } from '../../../components/AdmLayout';
import { CreateUser } from '../../../components/CreateUser';
import { UserList } from '../../../components/UserList';
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