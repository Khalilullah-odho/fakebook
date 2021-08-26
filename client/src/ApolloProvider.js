import React from "react";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const tokenKey = process.env.REACT_APP_TOKEN_KEY;
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API,
});

const setAuthLink = setContext(() => {
  const token = localStorage.getItem(tokenKey);
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: setAuthLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
