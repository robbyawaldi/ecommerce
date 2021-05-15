import { SelectQueryBuilder } from "typeorm";
import { Product } from "../entities/Product";
import { FilterProduct } from "../resolvers/FilterProduct";

export const searchProduct = async (
    products: SelectQueryBuilder<Product>,
    {
        search
    }: FilterProduct
) => {
    if (search && search !== "") {
        search = search.trim()
        products = products.where('product.title iLIKE :search', { search: `%${search}%` })
        if (await products.getCount() == 0)
            products = products.where('categories.name iLIKE :search', { search: `%${search}%` })
    }

    return products
}