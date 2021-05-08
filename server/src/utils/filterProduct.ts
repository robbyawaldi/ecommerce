import { SelectQueryBuilder } from "typeorm";
import { LIMIT } from "../constants";
import { Product } from "../entities/Product";
import { FilterProduct } from "../resolvers/FilterProduct"

export const filterProduct = async (
    products: SelectQueryBuilder<Product>,
    {
        categoryId,
        isExclusive,
        isDiscount,
        sortByName,
        sortByPrice,
        isAdmin
    }: FilterProduct
) => {
    if (categoryId && categoryId !== 0) {
        products = products.where('categories.id = :categoryId', { categoryId });
    }

    if (isExclusive) {
        products = products.where('product.isExclusive = :isExclusive', { isExclusive })
    }

    if (isDiscount) {
        products = products.where('product.isDiscount = :isDiscount', { isDiscount })
    }

    if (sortByName)
        products = products.orderBy('product.title', sortByName)
    else if (sortByPrice)
        products = products.orderBy('product.price', sortByPrice)
    else
        products = products.orderBy('product.createdAt', 'DESC')

    if (isAdmin == undefined || !isAdmin) {
        products = products.limit(LIMIT)
    }

    return products
}