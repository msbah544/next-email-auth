"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleInput = (e) => {
    switch (e.target.name) {
      case "email":
        return setCreds({ ...creds, email: e.target.value });

      case "password":
        return setCreds({ ...creds, password: e.target.value });

      default:
        setCreds((prev) => prev);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        email: creds.email,
        password: creds.password,
        redirect: false,
      });

      if (response.error) {
        setError("Creds Invalid");
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" grid place-items-center h-screen">
      <div className=" shadow-lg p-5 border-t-4 border-green-400 rounded-lg">
        <h1 className="text-xl font-bold my-4">Enter Login Details</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
          <input
            name="email"
            value={creds.email}
            onChange={(e) => handleInput(e)}
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            value={creds.password}
            onChange={(e) => handleInput(e)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 font-bold text-white px-6 py-2 cursor-pointer">
            Login
          </button>
          {error && (
            <div className=" bg-red-500 w-fit text-sm rounded-md text-white py-1 px-2 my-3">
              {error}
            </div>
          )}

          <Link className=" text-sm text-right mt-3" href={`/register`}>
            Don't have an account?{" "}
            <span className="underline">Register Now</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
