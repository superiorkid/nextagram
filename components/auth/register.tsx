import React from "react";
import Logo from "../logo";
import SocialLogin from "./social-login";
import RegisterForm from "./register-form";

const Register = () => {
  return (
    <React.Fragment>
      <Logo className="h-[44px] mt-5 mb-7" />
      <p className="text-lg font-bold text-gray-500 dark:text-gray-400 text-center mb-3 leading-tight">
        Sign up to see photos from your friends.
      </p>
      <SocialLogin
        label="Log in with Discord"
        provider="discord"
        className="border rounded-lg bg-[#5562EA] text-white font-medium text-sm py-1.5"
      />

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white dark:bg-black dark:text-white px-2 text-gray-500 font-bold">
            OR
          </span>
        </div>
      </div>

      <RegisterForm />
    </React.Fragment>
  );
};

export default Register;
