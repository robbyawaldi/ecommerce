import { InputType, Field, Int } from "type-graphql";
@InputType()
export class ProductInput {
    @Field()
    title: string;
    @Field()
    description: string;
    @Field(() => Int)
    price: number;
    @Field(() => Boolean)
    stockAvailable: boolean;
}
