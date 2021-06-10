import { Field, InputType } from "type-graphql";

@InputType()
export class PriceSizeInput {
    @Field()
    sizeId: number;
    @Field()
    price: number;
}