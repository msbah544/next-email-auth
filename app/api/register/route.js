import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const userCreds = await req.json();
    const { name, email, password } = userCreds;

    const exists = await User.findOne({ email }).select("_id");

    if (exists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    if (user) {
      return NextResponse.json(
        { message: "user registered", user },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message:
            "Failed to register user, try again in a moment or contact support",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return;
  }
};
