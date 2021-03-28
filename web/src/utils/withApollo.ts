import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { createUploadLink } from 'apollo-upload-client'
import { PaginatedProducts } from "../generated/graphql";

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
    cache: new InMemoryCache(
      // {
      //   typePolicies: {
      //     Query: {
      //       fields: {
      //         products: {
      //           keyArgs: [],
      //           merge(
      //             existing: PaginatedProducts | undefined,
      //             incoming: PaginatedProducts,
      //             { readField }
      //           ): PaginatedProducts {
      //             return {
      //               ...incoming,
      //               products: [
      //                 ...incoming.products.filter(a =>
      //                   existing?.products.find(b => readField("id", b) === readField("id", a))
      //                   === undefined),
      //                 ...(existing?.products || [])
      //               ]
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    ),
  });

export const withApollo = createWithApollo(createClient);
