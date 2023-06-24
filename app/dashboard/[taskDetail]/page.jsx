"use client";
import TaskDetails from "@components/TaskDetails";
import { useParams } from "next/navigation";
import { dummydata } from "@components";

const TaskDetail = () => {
  const { taskDetail } = useParams();
  const dataDetails = dummydata?.filter((item) => item.id === +taskDetail);
  return <TaskDetails data={dataDetails[0]} />;
};

export default TaskDetail;
