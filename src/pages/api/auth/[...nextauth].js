import NextAuth from "next-auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleOAuthProvider({
     clientId: process.env.NEXT_PUBLIC_GOOGLE,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
