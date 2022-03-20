import { Field, ID, ObjectType } from "type-graphql";
import { Room } from "./Room";
import { User } from "./User";

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  from: User;

  @Field(() => String)
  to: Room["slug"];

  @Field()
  message: string;

  @Field()
  time: Date;
}
