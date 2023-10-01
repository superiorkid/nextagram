import React from "react";

const RegisterForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          className="auth-input"
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Full Name"
          className="auth-input"
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Username"
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="auth-input"
        />
      </div>

      <div className="text-xs text-center space-y-2.5 text-gray-500 my-3">
        <p>
          People who use our service may have uploaded your contact information
          to Instagram.{" "}
          <span className="font-bold text-sky-500">Learn More</span>
        </p>
        <p>
          By signing up, you agree to our Terms ,{" "}
          <span className="font-bold text-sky-500">Privacy Policy</span> and{" "}
          <span className="font-bold text-sky-500">Cookies Policy.</span>
        </p>
      </div>

      <button
        type="submit"
        className="border bg-sky-500 text-white font-semibold w-full rounded-lg py-1.5 text-sm"
      >
        Sign up
      </button>
    </form>
  );
};

export default RegisterForm;
