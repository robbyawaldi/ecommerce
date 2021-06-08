import { Field, InputType } from "type-graphql";

@InputType()
export class ColorInput {
    @Field()
    code: string;

    @Field()
    name: string;
}