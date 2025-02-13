import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"]
    }
    
    interface User {
        id: string;
        email: string;
        name?: string | null;
        image?: string | null;
        role: string;
        roles?: {
            name: string;
        }[];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: string;
        role: string;
    }
}