import { PriceSizeAction, priceSizeItem, PriceSizes, ProductPriceSize } from "../../types/priceSizes";
import { randomId } from "../../utils/randomId";

export function priceSizeReducer(state: PriceSizes, action: PriceSizeAction) {
    switch (action.type) {
        case "ADD":
            return {
                priceSizes: [...state.priceSizes, { ...priceSizeItem, id: randomId() }]
            }
        case "UPDATE":
            return {
                priceSizes: state.priceSizes.map((priceSize: ProductPriceSize) =>
                    priceSize.id == action.id
                        ? { ...priceSize, sizeId: action.sizeId ?? priceSize.sizeId, price: action.price ?? priceSize.price }
                        : priceSize
                )
            }
        case "DELETE":
            return {
                priceSizes: state.priceSizes.filter((priceSize: ProductPriceSize) => priceSize.id != action.id)
            }
        case "SET":
            return {
                priceSizes: [...action.priceSizes]
            }
        default:
            return state
    }
}