import Navbar from "../../components/layout/Navbar";

import { authMiddleware } from "../../middlewares/auth.middleware";

export default async function AppLayout({ children }) {
  await authMiddleware();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
