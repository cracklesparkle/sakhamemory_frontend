import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { query } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                const users = await query('SELECT * FROM users WHERE email = ?', [email]);

                if (users.length === 0) {
                    return null;
                }

                const user = users[0];
                const isValidPassword = await bcrypt.compare(password, user.password);

                if (!isValidPassword) {
                    return null;
                }

                return { id: user.id, email: user.email, role: user.role };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
