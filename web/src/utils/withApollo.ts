import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { createUploadLink } from 'apollo-upload-client'

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    link: createUploadLink({
      uri: process.env.NEXT_PUBLIC_API_URL as string,
      credentials: "include",
      headers: {
        cookie:
          (typeof window === "undefined"
            ? ctx?.req?.headers.cookie
            : undefined) || "",
      }
    }),
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(createClient);
