import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
import { auth } from 'firebase-admin';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
    }),
  }),
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        const uidExists = await auth()
          .getUser(user.id)
          .then(() => true)
          .catch(() => false);

        if (!uidExists)
          await auth().createUser({ uid: user.id, email: user.email });

        const customToken = await auth().createCustomToken(user.id);

        session.user.id = user.id;
        session.user.customToken = customToken;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
