function AuthLayout({ children }) {
  return (
    <div className="auth-background relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full border-[28px] border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full border-[36px] border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-10 hidden h-24 w-24 rounded-full bg-orange-200/30 md:block"
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white px-6 py-10 shadow-xl sm:px-10">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
