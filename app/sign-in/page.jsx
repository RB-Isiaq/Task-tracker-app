"use client";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SignIn= () => {
  const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
  const params = useSearchParams();
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    setError(params.get("error"))
    setSuccess(params.get("success"))
  }, [params]);
  const handSubmit = async (e) => {
    e.preventDefault();
   
    const form = new FormData(e.target);
    const { username, password } = Object.fromEntries(form.entries());

    signIn("credentials", {
      redirect: true,
      username,
      password,
      callbackUrl: "/dashboard",
    });
    // router.push("/dashboard")
    // if (status === "authenticated") {
      
    // } 
  };
  return (
    <>
      <form
        onSubmit={handSubmit}
        action="post"
        className="flex flex-col gap-4 items-center mt-10 mb-4 w-full sm:w-[550px]"
      >
        <h1 className="text-lg blue_gradient">{success ? success : "Welcome Back"}</h1>
        <input
          type="username"
          placeholder="username"
          required
          name="username"
          autofocus 
          className="search_input peer"
        />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          className="search_input peer"
        />
          <div className="flex justify-between gap-10">
        
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white w-max shadow-lg"
            >
            Sign In
          </button>
          {/* <button
            type="button"
            className="px-5 py-1.5 text-sm bg_green_gradient rounded-full text-white w-max shadow-lg"
            onClick={() => signIn("google")}
            >
            Google
          </button> */}
        </div>
     
      </form>
      {error && <p className="text-red-400">{error}</p>}
      <p>
        Don't have an account?{" "}
        <Link href="/sign-up">
          <span className="orange_gradient">Sign Up</span>
        </Link>
      </p>
    </>
  );
};

export default SignIn;
