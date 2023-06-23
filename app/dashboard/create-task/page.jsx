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
    
const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    formData.userId = session?.uṣer.name;
    
    try {
      const res = await fetch("/api/task/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      res.status === 201 && router.push("/dashboard");
    } catch (error) {
      setError(error);
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
