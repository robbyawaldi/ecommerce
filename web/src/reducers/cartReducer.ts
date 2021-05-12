import { Cart } from "../contexts/CartContext"

export const cartReducer = (state: Cart[], action: { type: string, payload?: any }) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'ADD':
            return [...state, action.payload]
        case 'UPDATE':
            return [...state.map(
                (state) => state.id == action.payload.id
                    ? { ...state, ...action.payload }
                    : state
            )]
        case 'DELETE':
            return [...state.filter((state) => state.id != action.payload)]
        default:
            return state
    }
}