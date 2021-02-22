import { InputType, Field, Int } from "type-graphql";
@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  name: string;
  @Field()
  password: string;
  @Field(() => Int)
  roleId: number;
}
