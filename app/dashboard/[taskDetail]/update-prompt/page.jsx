"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { data } from "@components";

import Form from "@components/Form";

const EditTask = () => {
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName);
  const taskID = pathName.split("/").splice(2, 1).join("");
  console.log(taskID);
  const taskEdit = data.filter((item) => item.id === +taskID);
  console.log(dataEdit);
  const [submitting, setSubmitting] = useState(false);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    dueDate: "",
    status: ""
  });

  useEffect(() => {
    const getTaskDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setTask({
        title: data.title,
        desc: data.desc,
        dueDate: data.dueDate,
        status: data.status
      });
    };

    if (taskID) getTaskDetails();
  }, []);

  const updateTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!taskID) alert("Task ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data.title,
        desc: data.desc,
        dueDate: data.dueDate,
        status: data.status
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
      type="Edit"
      task={taskEdit[0]}
      setTask={setTask}
      submitting={submitting}
      handleSubmit={updateTask}
    />
  );
};

export default EditTask;
