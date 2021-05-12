import { Field, ObjectType } from "type-graphql";
import { Product } from "../entities/Product";
import { Meta } from "./Meta";

@ObjectType()
export class Filter {
    @Field()
    category: string;
}

@ObjectType()
export class PaginatedProducts {
    @Field(() => [Product])
    products: Product[];
    @Field(() => Meta)
    meta: Meta;
}