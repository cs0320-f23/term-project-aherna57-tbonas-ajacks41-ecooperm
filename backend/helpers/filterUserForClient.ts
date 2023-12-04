import type { User } from "@clerk/nextjs/dist/types/api";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePictureURL: user.profilePictureURL,
    externalUsername:
      user.externalAccounts.find(
        (externalAccount) => externalAccount.provider === "oauth_google"
      )?.username || null,
  };
};
