import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import React from 'react'
import Link from 'next/link'

interface UserListProps {

}

export const UserList: React.FC<UserListProps> = ({ }) => {
    const handleDelete = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        console.log(id)
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
                        <Tr>
                            <Td>
                                <Link href="/">
                                    <span className="font-semibold">
                                        robbyawaldi@gmail.com
                            </span>
                                </Link>
                            </Td>
                            <Td>Robby Awaldi</Td>
                            <Td>admin</Td>
                            <Td className="space-x-3">
                                <Link href="/">
                                    <a className="font-semibold">Edit</a>
                                </Link>
                                <a className="font-semibold" onClick={handleDelete.bind(this, "sSdfaf")}>Delete</a>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
        </section>
    );
}