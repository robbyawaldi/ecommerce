import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields";
import { SelectQueryBuilder } from "typeorm";
import { Product } from "../entities/Product";

const EXCEPT_FIELDS = [
    'url',
    'sizeName',
    'exceptSizes',
    '__typename'
]

const FIELD_RELATION = [
    'exceptSizes'
]

export const joinProduct = (
    products: SelectQueryBuilder<Product>,
    info: GraphQLResolveInfo,
    fields: string[],
    relations: string[],
): SelectQueryBuilder<Product> => {
    for (const relation of relations.filter(r => fields.includes(r))) {
        const fields = Object.keys(graphqlFields(info).products[relation])

        products = leftJoinAndSelect(
            products,
            `product.${relation}`,
            relation,
            fields.filter(field => !EXCEPT_FIELDS.includes(field)).map(field => `${relation}.${field}`)
        )

        for (const fieldRelation of fields.filter(f => FIELD_RELATION.includes(f))) {
            const relationField = Object.keys(graphqlFields(info).products[relation][fieldRelation])

            products = leftJoinAndSelect(
                products,
                `${relation}.${fieldRelation}`,
                fieldRelation,
                relationField.filter(field => !EXCEPT_FIELDS.includes(field)).map(field => `${relation}.${field}`)
            )
        }
    }
    return products
}

const leftJoinAndSelect = (
    products: SelectQueryBuilder<Product>,
    property: string,
    alias: string,
    select: string[]
) => {
    return products.leftJoinAndSelect(property, alias).addSelect(select)
}