import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Room {
  @Field()
  slug: string;

  @Field(() => [User])
  members: Array<User>;

  @Field()
  discussion: string;

  @Field()
  description: string;
}
