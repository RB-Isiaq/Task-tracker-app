"use client";
import TaskDetails from "@components/TaskDetails";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const TaskDetail = () => {
  const router = useRouter();
  const [task, setTask] = useState({});
  const { taskId } = useParams();

  const fetchTask = async () => {
    const response = await fetch(`/api/task/${taskId}`);
    const data = await response.json();
    console.log(data);
    setTask(data);
  };

  fetchTask();

  const handleDelete = async () => {
    const response = await fetch(`/api/task/${taskId}`, {
      method: "DELETE",
      body: {
        id: taskId,
      },
    });
    // await response.json();
    router.push("/dashboard");
  };

  return <TaskDetails data={task} deleteHandler={handleDelete} />;
};

export default TaskDetail;