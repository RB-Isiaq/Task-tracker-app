"use client";
import { useState } from "react";
import Link from "next/link";

const Form = ({ type, task, setTask, submitting, handleSubmit }) => {
  const [dueDate, setDueDate] = useState(task?.dueDate.split("/").reverse().join("-"));
  const [status, setStatus] = useState(task?.status);
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Task</span>
      </h1>
      <p className="desc text-left max-w-md">{type} your task today.</p>
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Title
          </span>
          <input
            value={task?.title}
            type="text"
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="write your task title here"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            value={task?.desc}
            onChange={(e) => setTask({ ...task, desc: e.target.value })}
            placeholder="write your task description here"
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Due date
          </span>
          <input
            value={dueDate}
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Status
          </span>
          <select
            name=""
            id=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form_input"
          >
            <option value="not-started">Not started</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/dashboard" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
