import { Table, Thead, Tr, Th, Tbody, Td, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import Link from 'next/link'
import { ModalConfirm } from './ModalConfirm';
import { useRouter } from 'next/router';

interface UserListProps {

}

export const UserList: React.FC<UserListProps> = ({ }) => {
    const [users, setUsers] = React.useState([
        { id: "akdkAJD", name: "Robby Awaldi", email: "robbyawaldi@gmail.com", role: { id: 2, name: "Admin" } }
    ])
    const router = useRouter()
    const { isOpen, onClose } = useDisclosure({
        isOpen: typeof router.query.delete == 'string',
        onClose: () => {
            router.replace('', '')
        }
    })

    const handleDelete = React.useCallback(() => {
        setUsers(users => users.filter(user => user.id !== router.query.delete))
        router.replace('', '')
    }, [router.query])

    const modalProps = {
        isOpen,
        onClose,
        title: "Delete User",
        onAccept: handleDelete
    }

    return (
        <section className="bg-white w-full rounded-md p-5 shadow-lg my-5">
            <h1 className="text-lg border-b-2 h-10">User List</h1>
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
                        {users.map(user => (
                            <Tr key={user.id}>
                                <Td>
                                    <Link href={`/adm/users/edit/${user.id}`}>
                                        <span className="font-semibold cursor-pointer">
                                            {user.email}
                                        </span>
                                    </Link>
                                </Td>
                                <Td>{user.name}</Td>
                                <Td>{user.role.name}</Td>
                                <Td className="space-x-3">
                                    <Link href={`/adm/users/edit/${user.id}`}>
                                        <a className="font-semibold">Edit</a>
                                    </Link>
                                    <Link href={`/adm/users?delete=${user.id}&email=${user.email}`}>
                                        <a className="font-semibold">Delete</a>
                                    </Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
            <ModalConfirm {...modalProps} >
                <p>
                    Are you sure to delete {router.query.email}
                </p>
            </ModalConfirm>
        </section>
    );
}