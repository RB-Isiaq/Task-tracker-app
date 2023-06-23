"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const handSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      res.status === 201 && router.push("/?success=Account has been created");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handSubmit}
        action="post"
        className="flex flex-col gap-4 items-center mt-10 mb-4 w-full sm:w-[550px]"
      >
        <h1 className="text-lg blue_gradient">Get Started</h1>
        <input
          type="text"
          placeholder="Full name"
          required
          name="fullName"
          className="search_input peer"
        />
        <input
          type="username"
          placeholder="username"
          required
          name="username"
          className="search_input peer"
        />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          className="search_input peer"
        />
        <button
          type="submit"
          className="px-5 py-1.5 text-sm bg_blue_gradient rounded-full text-white w-max"
        >
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-400">Something went wrong</p>}
      <p>
        Already have an account?{" "}
        <Link href="/">
          <span className="orange_gradient">Sign In</span>
        </Link>
      </p>
    </>
  );
};

export default SignUp;
