import React, { createContext, useEffect, useReducer } from 'react'
import { cartReducer } from '../reducers/cartReducer';

interface CartContextProps { }

export type Cart = {
    id: string
    qty: number
    size: string
    color: string
}

export const CartContext = createContext<{
    carts: Cart[];
    dispatch: React.Dispatch<{ type: string, payload?: any }>
}>({
    carts: [],
    dispatch: () => null
})

const CartContextProvider: React.FC<CartContextProps> = ({ children }) => {
    const [carts, dispatch] = useReducer(cartReducer, [])

    useEffect(() => {
        let localData = localStorage.getItem('carts')
        localData ? dispatch({ type: 'SET', payload: JSON.parse(localData) }) : null
    }, [])

    useEffect(() => {
        localStorage.setItem('carts', JSON.stringify(carts))
    }, [carts])

    return (
        <CartContext.Provider value={{ carts, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider