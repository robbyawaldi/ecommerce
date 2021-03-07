import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import React from 'react'
import Link from 'next/link'
import { ModalConfirm } from './ModalConfirm';
import { useRouter } from 'next/router';
import { useDeleteUserMutation, UsersDocument, useUsersQuery } from '../../generated/graphql';
import card from '../../styles/Card.module.css'

interface UserListProps { }

export const UserList: React.FC<UserListProps> = ({ }) => {
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
    const { data, error, loading } = useUsersQuery({
        variables: {
            limit: 5
        },
        notifyOnNetworkStatusChange: true
    })
    const [deleteUser] = useDeleteUserMutation()
    const router = useRouter()

    React.useEffect(() => {
        if (typeof router.query.delete == 'string') {
            setOpenDeleteModal(true)
        }
    }, [router.query.delete])

    const handleDelete = React.useCallback(async () => {
        const response = await deleteUser({
            variables: { id: router.query.delete as string },
            refetchQueries: [
                {
                    query: UsersDocument,
                    variables: { limit: 5 }
                }
            ]
        })
        if (response.data?.deleteUser) {
            handleClose()
        }
    }, [router.query.delete])

    const handleClose = React.useCallback(() => {
        setOpenDeleteModal(false)
        router.replace({
            pathname: router.pathname
        })
    }, [])

    if (!loading && !data) {
        return (
            <div>
                <div>you got query failed for some reason</div>
                <div>{error?.message}</div>
            </div>
        )
    }

    if (!data && loading) {
        return <div>loading...</div>
    }

    return (
        <section className={card.box}>
            <h1 className={card.title}>User List</h1>
            <div className="overflow-x-auto">
                <Table variant="simple" mt={3}>
                    <Thead>
                        <Tr>
                            <Th>Email</Th>
                            <Th>Name</Th>
                            <Th>Role</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.users.users.map((user) => (
                            <Tr key={user.id}>
                                <Td>
                                    <Link href={{
                                        pathname: '/adm/users/edit/[id]',
                                        query: { id: 'sdsd' }
                                    }}>
                                        <span className="font-semibold cursor-pointer">
                                            {user.email}
                                        </span>
                                    </Link>
                                </Td>
                                <Td>{user.name}</Td>
                                <Td>{user.role.name}</Td>
                                <Td className="space-x-3">
                                    <Link href={{
                                        pathname: '/adm/users/edit/[id]',
                                        query: { id: user.id }
                                    }}>
                                        <a className="font-semibold">Edit</a>
                                    </Link>
                                    <Link href={{
                                        pathname: '/adm/users',
                                        query: { delete: user.id, email: user.email }
                                    }}>
                                        <a className="font-semibold">Delete</a>
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
            <ModalConfirm
                title="Delete User"
                isOpen={openDeleteModal}
                onAccept={handleDelete}
                onClose={handleClose}>
                <p>
                    Are you sure to delete {router.query.email}
                </p>
            </ModalConfirm>
        </section>
    );
}