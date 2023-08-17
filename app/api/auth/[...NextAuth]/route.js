import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDB from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        //implement login
        const { email, password } = credentials;
        try {
          await connectToDB();
          //check if user exists
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          //compare password
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
