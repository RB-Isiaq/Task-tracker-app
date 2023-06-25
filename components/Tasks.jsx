"use client";
import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

const TasksList = ({ data, sort }) => {
  let sortedData = data;
  if (sort === "title") {
    sortedData = data.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
  }
  if (sort === "status") {
    sortedData = data.sort((a, b) => {
      if (a.status > b.status) return -1;
      if (a.status < b.status) return 1;
      return 0;
    });
    console.log(sortedData);
    console.log(data);
  }
  if (sort === "date") {
    sortedData = data.sort((a, b) => {
      const dateA = new Date(a.dueDate.split("/").reverse().join("/"));
      const dateB = new Date(b.dueDate.split("/").reverse().join("/"));
      return dateA - dateB;
    });
  }
  return (
    <div className="mt-6">
      {sortedData.map((task) => (
        <TaskCard
          key={task._id}
          id={task._id}
          title={task.title}
          status={task.status}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
};

const Tasks = ({ sort, userSessionId }) => {
  const [allTasks, setAllTasks] = useState([]);

  
  const fetchTasks = async () => {
    const response = await fetch("/api/task");
    const dataRes = await response.json();
    const userData = dataRes.filter((data) => data.userId === userSessionId);
    console.log(userData);
    setAllTasks(userData);
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  return <TasksList data={allTasks} sort={sort} />;
};

export default Tasks;
