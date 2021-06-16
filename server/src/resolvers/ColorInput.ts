import { Field, InputType, Int } from "type-graphql";

@InputType()
export class ColorInput {
    @Field()
    id: string;
    @Field()
    code: string;
    @Field()
    name: string;
    @Field(() => [Int], { nullable: true })
    exceptSizes: number[];
}