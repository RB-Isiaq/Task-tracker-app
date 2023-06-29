import Link from "next/link";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
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

      <p className="text-lg my-10">
        Please{" "}
        <Link href="/sign-in" className="orange_gradient">
          sign in{" "}
        </Link>{" "}
        to continue
      </p>
    </section>
  );
};

export default Home;
