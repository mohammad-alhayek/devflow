"use client";

import Link from "next/link";

import LogoutButton from "../LogoutButton";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/projects" className="text-2xl font-bold text-white">
          Dev<span className="text-blue-500">Flow</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/projects"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Projects
          </Link>

          <Link
            href="/my-tasks"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            My Tasks
          </Link>

          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
