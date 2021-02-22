import { AiOutlineUser } from 'react-icons/ai'
import { AiFillTags } from 'react-icons/ai'

export const sideBarMenu = [
    {
        title: 'Users',
        slug: 'user',
        path: '/adm/users',
        icon: <AiOutlineUser />
    },
    {
        title: 'Products',
        slug: 'product',
        path: '/adm/products',
        icon: <AiFillTags />
    },
]