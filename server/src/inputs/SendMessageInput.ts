import { Field, InputType } from "type-graphql";
import { Room } from "../entities";

@InputType()
class UserInput {
  @Field()
  login: string;
  @Field(() => String, { nullable: true })
  name?: string;
  @Field()
  avatarUrl: string;
  @Field(() => String, { nullable: true })
  bio?: string;
}

@InputType()
export class SendMessageInput {
  @Field(() => UserInput)
  from: UserInput;
  @Field(() => String)
  to: Room["slug"];
  @Field()
  message: string;
}
