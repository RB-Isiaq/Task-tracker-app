"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

import Form from "@components/Form";

const UpdateTask = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { taskId } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    dueDate: "",
    status: "",
  });

  console.log(taskId);

  useEffect(() => {
    const getTaskDetails = async () => {
      const response = await fetch(`/api/task/${taskId}`);
      const data = await response.json();

      setTask(data);
    };
    // if (taskId) getTaskDetails();
    getTaskDetails();
  }, []);

  const updateTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = new Form(e.target);
    const formData = Object.fromEntries(form.entries());
    // formData.userId = session?.user.id;
    console.log(formData);
    // if (!taskId) alert("Task ID not found");
    try {
      const res = await fetch(`/api/task/${taskId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      res.status === 200 && router.push("/dashboard");
    } catch (error) {
      setError(error);
      console.log(error);
      alert(error);
    } finally {
      setSubmitting(false);
    }

    // if (!taskId) alert("Task ID not found");
    // try {
    //   const response = await fetch(`/api/prompt/${promptID}`, {
    //     method: "PATCH",
    //     body: JSON.stringify({
    //       title: data.title,
    //       desc: data.desc,
    //       dueDate: data.dueDate,
    //       status: data.status,
    //     }),
    //   });

    //   if (response.ok) {
    //     router.push("/dashboard");
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setSubmitting(false);
    // }
  };
  return (
    <Form
      type="Edit"
      task={task}
      setTask={setTask}
      submitting={submitting}
      handleSubmit={updateTask}
    />
  );
};

export default UpdateTask;
