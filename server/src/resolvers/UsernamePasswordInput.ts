import { InputType, Field, Int } from "type-graphql";
@InputType()
export class UsernamePasswordInput {
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  password: string;
  @Field(() => Int, { nullable: true })
  roleId: number;
}
