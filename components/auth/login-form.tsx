"use client";

import { cn } from "@/lib/utils";
import { TLogin, loginSchama } from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SvgSpinners3DotsMove from "../icons/SvgSpinners3DotsMove";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchama),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = (values: TLogin) => {
    setIsLoading((loading) => true);
    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Login Failed");
        }

        if (callback?.ok && !callback.error) {
          toast.success("Logged in");
          router.refresh();
        }
      })
      .finally(() => {
        setIsLoading((loading) => false);
      });
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onLoginSubmit)}>
      <div className="space-y-0.5">
        <input
          type="text"
          disabled={isLoading}
          placeholder="Email"
          className={cn(
            "auth-input dark:text-gray-800",
            isLoading && "text-gray-300",
            errors.email && "border-rose-500"
          )}
          {...register("email")}
        />
        <p className="text-xs text-rose-500 pl-1">{errors.email?.message}</p>
      </div>

      <div className="space-y-0.5">
        <input
          type="password"
          disabled={isLoading}
          placeholder="Password"
          className={cn(
            "auth-input dark:text-gray-800",
            isLoading && "text-gray-300",
            errors.password && "border-rose-500"
          )}
          {...register("password")}
        />
        <p className="text-xs text-rose-500 pl-1">{errors.password?.message}</p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "border bg-sky-500 text-white font-semibold w-full rounded-lg py-1.5 text-sm",
          isLoading && "bg-gray-300"
        )}
      >
        {isLoading ? <SvgSpinners3DotsMove className="h-5 w-full" /> : "Log in"}
      </button>
    </form>
  );
};

export default LoginForm;
