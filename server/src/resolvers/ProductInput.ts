import { InputType, Field, Int } from "type-graphql";
@InputType()
export class ProductInput {
    @Field({ nullable: true })
    title: string;
    @Field({ nullable: true })
    description: string;
    @Field(() => Int, { nullable: true })
    price: number;
    @Field(() => Boolean, { nullable: true })
    stockAvailable: boolean;
}
