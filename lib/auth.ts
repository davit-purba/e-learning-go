import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const res = await axios.post(
          `${process.env.BACKEND_URL}/api/auth/login`,
          {
            username: credentials.username,
            password: credentials.password,
          }
        );

        const user = res.data;
        if (!user) return null;
        console.log("user token", user)
        return {
          id: String(user.id),
          name: user.name,
          username: user.username as string,
          role: user.role,
          accessToken: user.accessToken
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: any) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          role: user.role,
        };
        token.accessToken = user.accessToken
      }

      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
        };
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
