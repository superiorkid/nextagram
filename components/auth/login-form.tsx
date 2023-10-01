"use client";

import { useTransition } from "react";
import { TLogin, loginSchama } from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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
    startTransition(() => {
      signIn("credentials", { ...values, redirect: false })
        .then((response) => {
          toast.success("Login Successfully");
          router.push("/");
        })
        .catch((error) => {
          toast.error("Login failed");
        });
    });
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onLoginSubmit)}>
      <input
        type="text"
        placeholder="Email"
        className={cn("auth-input", isPending && "text-gray-300")}
        {...register("email")}
      />
      <input
        type="password"
        placeholder="Password"
        className={cn("auth-input", isPending && "text-gray-300")}
        {...register("password")}
      />

      <button
        type="submit"
        className={cn(
          "border bg-sky-500 text-white font-semibold w-full rounded-lg py-1.5 text-sm",
          isPending && "bg-gray-300"
        )}
      >
        {isPending ? "..." : "Log in"}
      </button>
    </form>
  );
};

export default LoginForm;
