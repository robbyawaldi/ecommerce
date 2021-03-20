import { ProductInput } from "../resolvers/ProductInput";

export const validateProduct = (options: ProductInput) => {
    if (!options.title.match(/\D/g)) {
        return [
            {
                field: "title",
                message: "invalid title"
            }
        ]
    }

    if (options.price < 0) {
        return [
            {
                field: "price",
                message: "value must be greater than 0"
            }
        ]
    }

    return null
}