"use client";
import { useState } from "react";
import Link from "next/link";
import Tasks from "@components/Tasks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserPage = () => {
  const [sort, setSort] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);

  if (status === "unauthenticated" ) {
    router.push("/")
  }

  return (
    <section className="w-full flex items-center flex-col mb-4">
      <h1 className="mt-10 text-[22px] sm:text-[28px] text-center">
        Welcome to your dashboard,{" "}
        <span className="orange_gradient">{session?.user?.name}.</span>
      </h1>
      <Link href="/dashboard/create-task">
        <button
          type="button"
          className="px-5 py-2 w-[200px] mx-auto mt-6 text-lg bg_green_gradient rounded-full text-white"
        >
          Add new task
        </button>
      </Link>
      <div className="flex flex-col mt-6 w-[310px] sm:w-[450px] px-4">
        <h1 className="mb-2">Sort tasks by</h1>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            value="sort"
            id="title"
            name="sorting"
            onChange={() => setSort("title")}
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            value="sort"
            id="status"
            name="sorting"
            onChange={() => setSort("status")}
          />
          <label htmlFor="status">Status</label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            value="sort"
            id="date"
            name="sorting"
            onChange={() => setSort("date")}
          />
          <label htmlFor="date">Due date</label>
        </div>
      </div>

      <Tasks sort={sort} />
    </section>
  );
};

export default UserPage;
