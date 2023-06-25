import React from "react";
import Link from "next/link";

const TaskCard = ({ id, title, status, dueDate }) => {
  return (
    <Link href={`/dashboard/${id}`}>
      <div className="flex flex-col border-[2px] sm:w-[450px] w-[310px] px-3 my-3 rounded-lg glassmorphism hover:scale-105 ease-in-out">
        <h1 className="capitalize sm:font-semibold text-lg sm:text-2xl mb-4">
          {title}
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className={`w-[10px] h-[10px] rounded-full ${
                status === "completed"
                  ? "bg-green-500"
                  : status === "in-progress"
                  ? "bg-blue-500"
                  : "bg-red-400"
              }`}
            />
            <span>{status}</span>
          </div>
          <span>{dueDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
