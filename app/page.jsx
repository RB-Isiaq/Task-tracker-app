"use client";
import Link from "next/link";

const Home = () => {
  
  return (

    <section className="w-full flex-center flex-col mb-6">
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
      
       <h1 className="text-lg">
        Please <Link href="/dashboard" className="orange_gradient">sign in </Link> to continue
      </h1>
      
            
    
    </section>
            
  );
};

export default Home;
