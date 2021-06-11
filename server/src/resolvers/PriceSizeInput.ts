import { Field, InputType } from "type-graphql";

@InputType()
export class PriceSizeInput {
    @Field()
    id: string;
    @Field()
    sizeId: number;
    @Field()
    price: number;
}