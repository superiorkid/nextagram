"use client";

import React from "react";
import Lottie from "lottie-react";
import animation from "../../public/assets/auth-lottie.json";

const AuthAnimation = () => {
  return (
    <div>
      <Lottie animationData={animation} loop={true} />
    </div>
  );
};

export default AuthAnimation;
