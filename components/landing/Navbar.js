export default function Navbar() {
  return (
    <nav className="border-b border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <h2 className="text-xl font-bold">
          Dev<span className="text-blue-500">Flow</span>
        </h2>

        <div className="flex items-center gap-6 text-sm text-slate-300">
          <a href="#features" className="hover:text-white">
            Features
          </a>

          <a href="/login" className="hover:text-white">
            Login
          </a>

          <a
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
