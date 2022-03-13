import axios from "axios";
import { GITHUB_GRAPHQL_API_URI, PAT } from "../constants";
import { User } from "../entities";

export default async function getGitHubUser(
  username: User["login"]
): Promise<User | null> {
  const data = JSON.stringify({
    query: `query User($login: String!) {
      user(login: $login) {
        login
        name
        avatarUrl
        bio
      }
    }`,
    variables: { login: username },
  });

  try {
    const res = await axios({
      method: "POST",
      url: GITHUB_GRAPHQL_API_URI,
      data,
      headers: {
        Authorization: `Bearer ${PAT}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.data.user as User;
  } catch (error) {
    console.error(error);
    return null;
  }
}
