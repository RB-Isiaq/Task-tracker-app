import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { fullName, username, password } = await request.json();

  await connectToDB();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name: fullName,
    username,
    password: hashedPassword,
  });
  console.log(newUser);

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error?.message, {
      status: 500,
    });
  }
};
