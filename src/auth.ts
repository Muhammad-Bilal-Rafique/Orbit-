import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDb } from "@/lib/connectDb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { CredentialsSignin } from "next-auth";

class notVerifiedError extends CredentialsSignin {
  code = "not_verified";
}
class GoogleAccountError extends CredentialsSignin {
  code = "google_account_error";
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost:true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDb();

          const user = await User.findOne({ email: credentials?.email });
          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials?.password as string,
            user.password,
          );

          if (!user.password) {
            throw new GoogleAccountError();
          }

          if (!isValid) return null;

          if (!user.isVerified) {
            throw new notVerifiedError();
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          if (
            error instanceof notVerifiedError ||
            error instanceof GoogleAccountError
          ) {
            throw error;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDb();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              password: "",
              isVerified: true,
            });
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});