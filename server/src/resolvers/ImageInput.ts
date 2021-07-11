import { Field, InputType } from "type-graphql";

@InputType()
export class ImageInput {
    @Field()
    id: string;
    @Field()
    image: string;
    @Field({ nullable: true })
    color: string;
}