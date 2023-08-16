"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [registerCreds, setRegisterCreds] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleInput = (e) => {
    //console.log("handleinput ran");
    //console.log("event", e.target.name);
    switch (e.target.name) {
      case "name":
        return setRegisterCreds({ ...registerCreds, name: e.target.value });
      case "email":
        return setRegisterCreds({ ...registerCreds, email: e.target.value });
      case "password":
        return setRegisterCreds({ ...registerCreds, password: e.target.value });
      default:
        setRegisterCreds((prev) => prev);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate input
    if (
      !registerCreds.name ||
      !registerCreds.email ||
      !registerCreds.password
    ) {
      return setError("All input fields are required");
    }

    setError("");

    //send request
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerCreds),
      });

      if (response.ok) {
        setRegisterCreds({
          name: "",
          email: "",
          password: "",
        });
        const user = await response.json();
        console.log("user", user);
        router.push("/");
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" grid place-items-center h-screen">
      <div className=" shadow-lg p-5 border-t-4 border-green-400 rounded-lg">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
          <input
            value={registerCreds.name}
            onChange={(e) => {
              handleInput(e);
            }}
            name="name"
            type="text"
            placeholder="Full Name"
          />
          <input
            value={registerCreds.email}
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => handleInput(e)}
          />
          <input
            value={registerCreds.password}
            type="password"
            placeholder="Password"
            onChange={(e) => handleInput(e)}
            name="password"
          />
          <button className="bg-green-600 font-bold text-white px-6 py-2 cursor-pointer">
            Register
          </button>
          {error && (
            <div className=" bg-red-500 w-fit text-sm rounded-md text-white py-1 px-2 my-3">
              {error}
            </div>
          )}

          <Link className=" text-sm text-right mt-3" href={`/`}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
