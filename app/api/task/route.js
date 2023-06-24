import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const GET = async (request, {session}) => {
    const id = "6493bc96b2e86b83ef934a5d";
    try {
        await connectToDB()

        const tasks = await Task.find({userId: id}).populate("userId");

        return new Response(JSON.stringify(tasks), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all tasks", { status: 500 })
    }
} 
