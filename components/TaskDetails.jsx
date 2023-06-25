"use client";
import Link from "next/link";
const TaskDetails = ({ data, deleteHandler }) => {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-6 justify-center items-center py-10 sm:w-[450px] w-[310px] px-3 sm:px-4 glassmorphism">
        <h1 className="capitalize text-center font-semibold text-2xl mb-4">
          {data?.title}
        </h1>
        <div className="w-full">{data?.desc}</div>
        <div className="flex justify-between gap-8 items-center w-full">
          <div className="flex gap-2 items-center">
            <div
              className={`w-[10px] h-[10px] rounded-full ${
                data?.status === "Completed"
                  ? "bg-green-500"
                  : data.?status === "In progress"
                  ? "bg-blue-500"
                  : "bg-red-400"
              }`}
            />
            <span>{data?.status}</span>
          </div>
          <span>{data?.dueDate}</span>
        </div>
        <div className="flex justify-between w-full">
          <Link href={`/dashboard/${data?.id}/update-task`}>
            <button
              type="button"
              className="px-5 py-2 text-lg bg-blue-400 rounded-full text-white"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="px-5 py-2 text-lg bg-red-500 rounded-full text-white"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default TaskDetails;
