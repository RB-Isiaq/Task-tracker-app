import { connectToDB } from "@utils/database";
import Task from "@models/task";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();

  try {
    await connectToDB();
    const newTask = new Task(body);

    await newTask.save();

    return new NextResponse("Task has been created", {
      status: 201,
    });
    // return new Response(JSON.stringify(newTask), {
    //   status: 201,
    // });
  } catch (error) {
    return new NextResponse("Failed to create a new Task", {
      status: 500,
    });
  }
};
