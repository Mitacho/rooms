export const { CORS_ORIGIN_URL, PAT, SESSION_SECRET, SESSION_SALT } =
  process.env;
export const PROD = process.env.NODE_ENV === "production";
export const SESSION_TTL = 315360e6; // 10 years
export const SESSION_KEY = "data";
export const COOKIE_NAME = "qid";
export const GITHUB_GRAPHQL_API_URI = "https://api.github.com/graphql";
