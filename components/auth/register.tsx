import React from "react";
import Logo from "../logo";
import SocialLogin from "./social-login";
import RegisterForm from "./register-form";

const Register = () => {
  return (
    <React.Fragment>
      <Logo />
      <p className="text-lg font-bold text-gray-500 text-center mb-3 leading-tight">
        Sign up to see photos from your friends.
      </p>
      <SocialLogin
        label="Log in with Discord"
        provider="discord"
        className="border rounded-lg bg-[#5562EA] text-white font-medium text-sm py-1.5"
      />
      <hr className="my-5" />
      <RegisterForm />
    </React.Fragment>
  );
};

export default Register;
