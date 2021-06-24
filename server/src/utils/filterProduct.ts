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
        isMalikha,
        sortByName,
        sortByPrice,
        isAdmin,
        ids
    }: FilterProduct
) => {
    if (categoryId && categoryId !== 0) {
        products = products.andWhere('categories.id = :categoryId', { categoryId });
        const p = await products.getMany()
        console.log("category", p.length)
    }

    if (isExclusive) {
        products = products.andWhere('product.isExclusive = :isExclusive', { isExclusive })
        const p = await products.getMany()
        console.log("exclusive", p.length)
    }

    if (isMalikha) {
        products = products.andWhere('product.isMalikha = :isMalikha', { isMalikha })
        const p = await products.getMany()
        console.log("is malikha", p.length)
    }

    if (isDiscount) {
        products = products.andWhere('product.isDiscount = :isDiscount', { isDiscount })
        const p = await products.getMany()
        console.log("is Discount", p.length)
    }

    if (sortByName)
        products = products.orderBy('product.title', sortByName)
    else if (sortByPrice)
        products = products.orderBy('product.price', sortByPrice)
    else
        products = products.orderBy('product.createdAt', 'DESC')

    if (isAdmin == undefined || !isAdmin) {
        products = products.andWhere('product.isPublish is true').limit(LIMIT)
        const p = await products.getMany()
        console.log("is admin", p.length)
    }

    if (ids) {
        if (ids.length == 0) {
            ids = [""]
        }
        products = products.andWhere('product.id IN (:...ids)', { ids })
        const p = await products.getMany()
        console.log("ids", p.length)
    }

    const p = await products.getMany()
    console.log("main", p.length)

    return products
}