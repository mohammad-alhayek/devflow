export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Welcome to <span className="text-blue-500">DevFlow</span>
          </h1>

          <p className="mt-2 text-slate-400">
            Sign in to manage your projects and tasks.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium transition hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:text-blue-400">
            Create one
          </a>
        </p>
      </div>
    </main>
  );
}
