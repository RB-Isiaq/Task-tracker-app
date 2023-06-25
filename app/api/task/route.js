import { connectToDB } from "@utils/database";
import Task from "@models/task";
import { NextResponse } from "next/server";

export const GET = async (request, { session }) => {
  const res = await request.json();
  console.log(res);
  console.log(session);
  try {
    await connectToDB();

    const tasks = await Task.find({}).populate("userId");
    return new NextResponse(JSON.stringify(tasks), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to fetch all Tasks", { status: 500 });
  }
};
