"use client";
import TaskDetails from "@components/TaskDetails";
import { useParams } from "next/navigation";
import { data } from "@components";

const TaskDetail = () => {
  const { taskDetail } = useParams();
  const dataDetails = data?.filter((item) => item.id === +taskDetail);
  return <TaskDetails data={dataDetails[0]} />;
};

export default TaskDetail;
