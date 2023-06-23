"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dashboard, setDashboard] = useState(false);

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const { username, password } = Object.fromEntries(form.entries());

    signIn("credentials", {
      username,
      password,
    });
    if (status === "authenticated") {
     setDashboard(true)
      // router.push("/dashboard");
    } 
    if (status === "unauthenticated") {
      setDashboard(false)
    }
    console.log(session);
  };
  return (

    <section className="w-full flex-center flex-col ">
      <h1 className="head_text text-center">
        Task
        <span className="orange_gradient text_center"> Tracker App</span>
      </h1>
      <p className="desc text-center">
        Stay organized and boost your productivity with our task tracker app.
        Easily manage your tasks, deadlines, and progress all in one place. With
        our intuitive interface, you can create, edit, and prioritize tasks
        effortlessly.
      </p>
      <h1 className="text-2xl font-bold orange_gradient mt-4">
        {success ? success : "Welcome Back"}
      </h1>
      {dashboard && <h1 className="text-lg">
        Go to your <Link href="/dashboard" className="orange_gradient">dashboard.</Link>
      </h1>}
      {!dashboard && <h1 className="text-lg">
       Please sign in to continue.
      </h1>}
            
      <form
        onSubmit={handleSubmit}
        className="relative w-full sm:w-[550px] flex gap-4 items-center flex-col mt-4 mb-4"
      >
        <input
          type="text"
          placeholder="username"
          name="username"
          required
          autoFocus
          className="search_input peer"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          className="search_input peer"
        />
        <div className="flex justify-between gap-10">
        
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white w-max"
            >
            Sign In
          </button>
          <button
            type="button"
            className="px-5 py-1.5 text-sm bg_green_gradient rounded-full text-white w-max"
            onClick={() => signIn("google")}
            >
            Google
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <p>
        Don't have an account?{" "}
        <Link href="/sign-up">
          <span className="orange_gradient">Sign up</span>
        </Link>
      </p>
    </section>
            
  );
};

export default Home;
