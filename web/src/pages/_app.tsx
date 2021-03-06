import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";
import "../assets/styles/globals.css";
import { NEXT_PUBLIC_GRAPHQL_API_URI } from "../constants";

const client = new ApolloClient({
  uri: NEXT_PUBLIC_GRAPHQL_API_URI as string,
  cache: new InMemoryCache(),
  credentials: "include",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
