import { users } from "../db";
import { User } from "../entities";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  user(@Arg("username") username: string) {
    return users.find((user) => user.username === username);
  }
}
