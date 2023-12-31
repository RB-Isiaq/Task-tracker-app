import { connectToDB } from "@utils/database";
import Task from "@models/task";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const task = await Task.findById(params.id);

    if (!task) return new Response("Task not found", { status: 404 });
    return new Response(JSON.stringify(task), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch task", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const body = await request.json();
  // const { task, tag } = await request.json();
  console.log(body);
  console.log(params.id);
  try {
    await connectToDB();

    const updatedTask = await Task.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    console.log(updatedTask);
    // const existingTask = await Task.findById(params.id);

    // if (!existingTask)
    //   return new Response("Task not found", { status: 404 });

    // existingTask.task = task;
    // existingTask.tag = tag;
    // existingTask = body

    // await updateExistingTask.save();
    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    return new Response("Failed to update task", {
      status: 500,
    });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    console.log(params.id);

    await Task.findByIdAndRemove(params.id);

    return new Response("Task deleted succesfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete task", {
      status: 500,
    });
  }
};
