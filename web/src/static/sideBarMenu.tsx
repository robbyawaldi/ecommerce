import { FaUsers } from 'react-icons/fa'
import { AiFillTags } from 'react-icons/ai'

export const sideBarMenu = [
    {
        title: 'Users',
        slug: 'user',
        path: '/adm/users',
        icon: <FaUsers />
    },
    {
        title: 'Products',
        slug: 'product',
        path: '/adm/products',
        icon: <AiFillTags />
    },
]