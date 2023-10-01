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
      <div className="space-y-0.5">
        <input
          type="text"
          disabled={isPending}
          placeholder="Email"
          className={cn(
            "auth-input",
            isPending && "text-gray-300",
            errors.email && "border-rose-500"
          )}
          {...register("email")}
        />
        <p className="text-xs text-rose-500 pl-1">{errors.email?.message}</p>
      </div>

      <div className="space-y-0.5">
        <input
          type="password"
          disabled={isPending}
          placeholder="Password"
          className={cn(
            "auth-input",
            isPending && "text-gray-300",
            errors.password && "border-rose-500"
          )}
          {...register("password")}
        />
        <p className="text-xs text-rose-500 pl-1">{errors.password?.message}</p>
      </div>

      <button
        type="submit"
        disabled={isPending}
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
