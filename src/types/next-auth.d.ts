// src/types/next-auth.d.ts
import type { Session as NextAuthSession, User as NextAuthUser } from 'next-auth';
import type { JWT as NextAuthJWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    username?: string | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user: NextAuthUser & {
      id: UserId;
      username?: string | null;
    };
  }

}