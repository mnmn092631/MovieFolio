import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/prisma";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: "/login",
		newUser: "/signup",
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
		CredentialsProvider({
			credentials: {
				email: { label: "email", type: "email" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.user.findUnique({
					where: { email: credentials.email as string },
				});

				if (!user) return null;

				const passwordMatch = await bcrypt.compare(credentials.password as string, user.password!);

				return passwordMatch ? user : null;
			},
		}),
	],
	callbacks: {
		async jwt({ token }) {
			return token;
		},
		async session({ session }) {
			return session;
		},
	},
});
