import type { User } from "@react-oauth/google";

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
