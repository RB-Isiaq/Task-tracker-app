import Task from "@models/task";
import { connectToDB } from "@utils/database";

export const GET = async (request, {session}) => {
    const id = session?.user.id;
    try {
        await connectToDB()

        const tasks = await Task.find({}).populate({ match: {userId: id} });

        return new Response(JSON.stringify(tasks), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all tasks", { status: 500 })
    }
} 
