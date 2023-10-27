import LoginForm from "@/components/auth/login-form";
import SocialLogin from "@/components/auth/social-login";
import Logo from "@/components/logo";
import React from "react";

const Login = () => {
  return (
    <React.Fragment>
      <Logo className="h-[44px] mt-5 mb-7" />
      <LoginForm />
      {/* <hr className="my-5" /> */}

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500 font-bold dark:bg-black dark:text-white">
            OR
          </span>
        </div>
      </div>

      <SocialLogin
        label="Log in with Discord"
        provider="discord"
        className="font-bold text-[#5562EA] mb-4 text-sm tracking-wide"
      />
      <p className="text-center text-xs text-[#697CA3]">Forgot password?</p>
    </React.Fragment>
  );
};

export default Login;
