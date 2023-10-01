import React from "react";
import Logo from "@/components/logo";
import LoginForm from "@/components/auth/login-form";
import SocialLogin from "@/components/auth/social-login";
import { FaDiscord } from "react-icons/fa6";

const Login = () => {
  return (
    <React.Fragment>
      <Logo />
      <LoginForm />
      <hr className="my-5" />
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
