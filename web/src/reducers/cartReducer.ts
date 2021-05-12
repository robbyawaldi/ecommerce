export const cartReducer = (state: string[], action: { type: string, item?: any }) => {
    switch (action.type) {
        case 'SET':
            return action.item
        case 'ADD':
            return [ ...state, action.item ]
        case 'DELETE':
            return [ ...state ]
        default:
            return state
    }
}