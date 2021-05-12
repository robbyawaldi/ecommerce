import React, { createContext, useEffect, useReducer } from 'react'
import { cartReducer } from '../reducers/cartReducer';
import { isServer } from '../utils/isServer';

interface CartContextProps { }

export const CartContext = createContext<{
    carts: string[];
    dispatch: React.Dispatch<{ type: string, item?: any }>
}>({
    carts: [],
    dispatch: () => null
})

const CartContextProvider: React.FC<CartContextProps> = ({ children }) => {
    const [carts, dispatch] = useReducer(cartReducer, [])

    useEffect(() => {
        let localData = localStorage.getItem('carts')
        localData ? dispatch({ type: 'SET', item: JSON.parse(localData) }) : null
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