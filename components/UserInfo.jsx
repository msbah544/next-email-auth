"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className=" grid place-items-center h-screen">
      <div className="rounded-lg shadow-lg p-5 flex flex-col gap-3">
        <h1>
          Name: <span className="font-bold">{session?.user.name}</span>
        </h1>
        <h1>
          Email: <span className="font-bold">{session?.user.email}</span>
        </h1>
        <button
          onClick={() => signOut()}
          className=" bg-red-500 py-2 px-3 text-white"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
