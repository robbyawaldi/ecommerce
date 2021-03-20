import { Field, InputType } from "type-graphql";

@InputType()
export class SizeInput {
    @Field({ nullable: true })
    name: string;
    @Field({ nullable: true })
    description: string;
}