"use client";

import React from "react";
import Lottie from "lottie-react";
import animation from "../../public/assets/auth-lottie.json";

const AuthAnimation = () => {
  return <Lottie animationData={animation} loop={true} alt="auth animation" />;
};

export default AuthAnimation;
