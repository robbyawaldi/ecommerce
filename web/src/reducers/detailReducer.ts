import { ProductDetail, ProductDetailAction } from "../types/ProductDetail";

export const detailReducer = (state: ProductDetail, action: ProductDetailAction) => {
    switch (action.type) {
        case "UPDATE":
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}