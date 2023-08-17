import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Register = () => {
  const session = getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
