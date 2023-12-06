import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { connectToDb } from "./utils/db"
import { User } from "./models"
import bcrypt from 'bcryptjs'

const login = async (credentials) => {
    try {
        await connectToDb()
        const user = await User.findOne({ email: credentials.email })
        if (!user) throw new Error('Wrong credentials.')

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        )
        if (!isPasswordCorrect) throw new Error('Wrong credentials.')

        return user;

    } catch (err) {
        throw new Error('Failed to login')
    }
}

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
            }
            return session;
        },
    },
})