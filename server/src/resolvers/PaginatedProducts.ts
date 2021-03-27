import { Field, ObjectType } from "type-graphql";
import { Product } from "../entities/Product";

@ObjectType()
export class Meta {
    @Field()
    page: number;
    @Field()
    limit: number;
    @Field()
    total: number;
}

@ObjectType()
export class PaginatedProducts {
    @Field(() => [Product])
    products: Product[];
    @Field(() => Meta)
    meta: Meta;
}