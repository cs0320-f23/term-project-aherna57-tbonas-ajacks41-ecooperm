//import {  }  from "@react-oauth/google";
//import type { CredentialResponse } from "~/node_modules/@react-oauth/google/dist/index.d.ts";
import type { User } from "~/node_modules/@clerk/nextjs/dist/types/api";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePictureURL: user.imageUrl,
    externalUsername:
      user.externalAccounts.find(
        (externalAccount) => externalAccount.provider === "oauth_google"
      )?.username || null,
  };
};
