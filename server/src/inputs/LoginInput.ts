import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  login: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field()
  avatarUrl: string;
  @Field(() => String, { nullable: true })
  bio?: string;
}
