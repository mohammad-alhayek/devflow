import { authMiddleware } from "../../middlewares/auth.middleware";

export default async function DashboardPage() {
  const user = await authMiddleware();

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-3xl font-bold">
        Welcome to <span className="text-blue-500">DevFlow</span>
      </h1>

      <p className="mt-2 text-slate-400">You are logged in.</p>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p>User ID: {user.userId}</p>

        <p className="mt-2">Role: {user.role}</p>
      </div>
    </main>
  );
}
