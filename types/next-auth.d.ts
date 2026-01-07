import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id?: string;
            username?: string;
            role?: string;
        } & DefaultSession['user'],
        accessToken: string
    }

    export interface User extends DefaultUser {
        id?: string;
        username?: string;
        role?: string;
    }
}