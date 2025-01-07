"use client";

import { Session } from "next-auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export interface SessionProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

const SessionProvider = ({ children, session }: SessionProviderProps) => (
  <NextAuthSessionProvider session={session}>
    {children}
  </NextAuthSessionProvider>
);

export default SessionProvider;
