import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authConfig from "../../../auth.config";
import authorizeUser from "./authFunctions";

const { handlers, auth, signIn } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Firebase",
      credentials: {},
      authorize: authorizeUser,
    }),
  ],
});

export { handlers, auth, signIn };
