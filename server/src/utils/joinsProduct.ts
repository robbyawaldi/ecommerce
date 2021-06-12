import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields";
import { SelectQueryBuilder } from "typeorm";
import { Product } from "../entities/Product";

export const joinProduct = (
    products: SelectQueryBuilder<Product>,
    info: GraphQLResolveInfo,
    fields: string[],
    relation: string,
): SelectQueryBuilder<Product> => {
    if (fields.includes(relation)) {
        const fields = Object.keys(graphqlFields(info).products[relation])
        return products
            .leftJoinAndSelect(`product.${relation}`, relation)
            .addSelect(fields.filter(field => !['url', '__typename', 'sizeName'].includes(field)).map(field => `${relation}.${field}`))
    }
    return products
}