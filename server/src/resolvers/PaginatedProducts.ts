import { Field, ObjectType } from "type-graphql";
import { Product } from "../entities/Product";

@ObjectType()
export class Filter {
    @Field()
    category: string;
}

@ObjectType()
export class Meta {
    @Field()
    page: number;
    @Field()
    limit: number;
    @Field()
    total: number;
    @Field(() => Filter, { nullable: true })
    filter?: Filter;
}

@ObjectType()
export class PaginatedProducts {
    @Field(() => [Product])
    products: Product[];
    @Field(() => Meta)
    meta: Meta;
}