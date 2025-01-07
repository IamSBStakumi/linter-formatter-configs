import type { NextAuthConfig, DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
    } & DefaultSession["user"];
  }

  interface User {
    uid: string;
    email?: string | null;
    idToken?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    uid: string;
  }
}

const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1day
    updateAge: 60 * 60, // 1hour
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // ログインしていなければログインページ(/login)へリダイレクト
      if (!isLoggedIn && !nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      // ログインしていてログインページにアクセスした場合、/layoutListにリダイレクト
      if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/layoutList", nextUrl));
      }

      return true;
    },

    async jwt({ token, trigger, user }) {
      const userToken = token;

      if (trigger === "update") {
        if (!token.sub || !user) return token;
        if (user) {
          userToken.uid = user.uid;
          userToken.email = user.email;
        }
      }

      return userToken;
    },

    async session({ session, trigger, token }) {
      const userSession = session;
      if (trigger === "update") {
        if (token.sub && userSession.user) {
          userSession.user.id = token.sub;
        }

        if (token.name && userSession.user) {
          userSession.user.name = token.name;
        }
        if (token.email && userSession.user) {
          userSession.user.email = token.email;
        }
        if (token.uid && userSession.user) {
          userSession.user.uid = token.uid;
        }
      }

      return userSession;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

export default authConfig;
