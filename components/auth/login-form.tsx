const LoginForm = () => {
  return (
    <form className="space-y-2">
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        className="auth-input"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="auth-input"
      />

      <button
        type="submit"
        className="border bg-sky-500 text-white font-semibold w-full rounded-lg py-1.5 text-sm"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
