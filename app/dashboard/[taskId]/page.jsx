"use client";
import TaskDetails from "@components/TaskDetails";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const TaskDetail = () => {
  const router = useRouter();
  const [task, setTask] = useState({});
  const { taskId } = useParams();

  //NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/task/${taskId}`,
    fetcher
  );
  setTask(data)
  
 // const fetchTask = async () => {
   // const response = await fetch(`/api/task/${taskId}`);
   // const data = await response.json();
    // console.log(data);
   // setTask(data);
  // };

  //fetchTask();

  const handleDelete = async () => {
    const response = await fetch(`/api/task/${taskId}`, {
      method: "DELETE",
      
    });
    mutate()
    // await response.json();
    router.push("/dashboard");
  };

  return <TaskDetails data={task} deleteHandler={handleDelete} />;
};

export default TaskDetail;
