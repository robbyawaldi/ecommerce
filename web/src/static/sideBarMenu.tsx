import { FaUsers } from 'react-icons/fa'
import { AiFillTags } from 'react-icons/ai'
import { IoMdListBox } from 'react-icons/io'

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
    {
        title: 'Categories',
        slug: 'category',
        path: '/adm/categories',
        icon: <IoMdListBox />
    },
]