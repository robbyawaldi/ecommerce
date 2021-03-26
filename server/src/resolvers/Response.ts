import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType({ isAbstract: true })
export abstract class Response {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}