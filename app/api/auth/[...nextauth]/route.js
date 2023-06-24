import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        // check if the user exists
        await connectToDB();
        try {
          const user = await User.findOne({
            username: credentials.username,
          });
          console.log(user, "FIRST");
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            console.log(user, "SECOND");
            if (isPasswordCorrect) return user;
            else {
              throw new Error("Wrong Credentials");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (error) {
          console.log(error, "ERROR");
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
       const sessionUser = await User.findOne({
        // email: session.user.email,
       name: session.user.name,
      });
  //     console.log(sessionUser);
    session.user.id = sessionUser._id.toString();

       return session;
    },
     async signIn({ profile }) {
      try {
         await connectToDB();

        console.log(profile);
         // check if a user already exists
       const userExists = await User.findOne({
           email: profile?.email,
         });

        console.log(userExists);

      // if not, create a new user
       if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile.name.replaceAll(" ", "").toLowerCase(),
          });
       }

       return true;
     } catch (error) {
        console.log(error);
       return false;
     }
   },
  },
  pages: {
    error: "/",
  },
});

export { handler as GET, handler as POST };
