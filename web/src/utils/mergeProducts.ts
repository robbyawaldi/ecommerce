import { Reference } from "@apollo/client"
import { ReadFieldFunction } from "@apollo/client/cache/core/types/common"
import { PaginatedProducts, Product } from "../generated/graphql"

export const incomingFilter = (
    existing: PaginatedProducts | undefined,
    readField: ReadFieldFunction,
    product: Product
) => {
    return !existing?.products.find((p) => readField("id", p) === readField("id", product))
}

export const existingFilter = (
    existing: PaginatedProducts | undefined,
    incoming: PaginatedProducts,
    readField: ReadFieldFunction,
    product: Product
) => {
    const categories = readField('categories', product) as Reference[]
    return categories.some(category => readField('name', category) === incoming.meta.filter?.category)
        && existing?.meta.page === incoming.meta.page
}