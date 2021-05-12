import { ObjectType, Field } from "type-graphql";
import { Filter } from "./PaginatedProducts";

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