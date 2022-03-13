import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { SESSION_KEY } from "../constants";
import { User } from "../entities";
import { LoginInput } from "../inputs";
import { Context, UserResponse } from "../types";
import getGitHubUser from "../utils/getGitHubUser";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { request }: Context): Promise<User | null> {
    if (!request.session.get(SESSION_KEY)) {
      return null;
    }

    return getGitHubUser(request.session.get(SESSION_KEY));
  }

  @Mutation(() => UserResponse)
  login(
    @Arg("options") options: LoginInput,
    @Ctx() { request }: Context
  ): UserResponse {
    request.session.set(SESSION_KEY, options.login);

    return {
      user: options,
    };
  }

  @Mutation(() => UserResponse)
  async findGitHubUser(@Arg("login") login: string): Promise<UserResponse> {
    const user = await getGitHubUser(login);
    return {
      user: user || undefined,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { request }: Context) {
    return new Promise((resolve) => {
      try {
        request.session.delete();
        resolve(true);
        return;
      } catch {
        resolve(false);
      }
    });
  }
}
