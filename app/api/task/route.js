import { connectToDB } from "@utils/database";
import Task from "@models/task";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDB();

    const tasks = await Task.find({}).populate('userId');
    console.log(tasks)
    return new NextResponse(JSON.stringify(tasks), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to fetch all Tasks", { status: 500 });
  }
};
