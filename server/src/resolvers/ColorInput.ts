import { Field, InputType } from "type-graphql";

@InputType()
export class ColorInput {
    @Field()
    id: string;
    @Field()
    code: string;
    @Field()
    name: string;
}