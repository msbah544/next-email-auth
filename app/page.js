import LoginForm from "@/components/LoginForm";
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const Home = () => {
  //can't use useSession() below, because React Context is unavailable in Server Components, therefore, use getServerSession(authOptions)
  //const { data: session } = useSession();

  const session = getServerSession(authOptions);

  if (session) redirect("/dashboard");
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default Home;
