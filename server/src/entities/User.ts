import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  login: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field()
  avatarUrl: string;
  @Field(() => String, { nullable: true })
  bio?: string;
}
