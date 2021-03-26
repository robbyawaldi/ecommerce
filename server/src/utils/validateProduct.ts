import { ProductInput } from "../resolvers/ProductInput";
import { ErrorMessage } from "../static/errorMessage";

export const validateProduct = (options: ProductInput) => {
    if (!options.title.match(/\D/g)) {
        return [
            {
                field: "title",
                message: ErrorMessage.Product.TITLE_INVALID
            }
        ]
    }

    if (options.price < 0) {
        return [
            {
                field: "price",
                message: ErrorMessage.Product.PRICE_MIN
            }
        ]
    }

    return null
}