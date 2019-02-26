import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { typeDefs } from "./LocalState/typeDefs";
import { resolvers, defaults } from "./LocalState/resolvers";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: withClientState({ resolvers, defaults, cache, typeDefs })
});
