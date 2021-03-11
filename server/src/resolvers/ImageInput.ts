import { Field, InputType } from "type-graphql";

@InputType()
export class ImageInput {
    @Field()
    image: string;
}