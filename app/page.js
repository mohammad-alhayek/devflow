import Navbar from "../components/landing/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="mx-auto flex min-h-[calc(100vh-81px)] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
          Project Management for Development Teams
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
          Manage your projects.
          <span className="block text-blue-500">Build better software.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          DevFlow helps software development teams manage projects, assign
          tasks, track progress, and collaborate in one place.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/register"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700"
          >
            Get Started
          </a>

          <a
            href="#features"
            className="rounded-lg border border-slate-700 px-6 py-3 font-medium hover:bg-slate-900"
          >
            View Features
          </a>
        </div>
      </section>
    </main>
  );
}
