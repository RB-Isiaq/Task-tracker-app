"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateTask = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    dueDate: "",
    status: ""
  });

  const createTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          title: task.title,
          desc: task.desc,
          dueDate: task.dueDate,
          status: task.status,
          userId: session?.user.name,
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
  
    
    <Form
      type="Create"
      task={task}
      setTask={setTask}
      submitting={submitting}
      handleSubmit={createTask}
    />
      
  );
};

export default CreateTask;
