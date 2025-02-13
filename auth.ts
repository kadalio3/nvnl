import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { User } from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import type { Adapter } from 'next-auth/adapters';
import { prisma } from "@/lib/prisma"
import { compareSync } from "bcrypt-ts";
import { SignInSchema } from "@/lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {strategy: "jwt"},
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        name: {},
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          throw new Error('Credentials are required');
        }

        const validateField = SignInSchema.safeParse(credentials);
        if (!validateField.success) {
          throw new Error('Invalid credentials format');
        }

        const { email, password } = validateField.data;

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            roles: {
              select: {
                name: true
              }
            }
          }
        });

        if (!user || !user.password) {
          throw new Error('No user found or password missing');
        }

        const passwordMatch = compareSync(password, user.password);
        if (!passwordMatch) {
          throw new Error('Invalid password');
        }

        // Transform the user object to match our User type
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.roles[0]?.name || 'user'
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedin = !!auth?.user;
      const protectedRoutes = ["/dashboard", "/user"];

      if (!isLoggedin && protectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedin && nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role;
      return session;
    },
  },
})