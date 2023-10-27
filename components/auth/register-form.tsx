"use client";

import { userRegistration } from "@/_actions/auth.action";
import { cn } from "@/lib/utils";
import { TRegister, registerSchema } from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SvgSpinners3DotsMove from "../icons/SvgSpinners3DotsMove";

const RegisterForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      username: "",
    },
  });

  const onRegisterSubmit = (values: TRegister) => {
    startTransition(async () => {
      await userRegistration(values)
        .then((response) => {
          reset();
          toast.success("Register successfully");
          router.push("/auth?variant=login");
        })
        .catch((error) => {
          toast.error("Error while register");
        });
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onRegisterSubmit)}>
      <div className="space-y-2">
        <div className="space-y-0.5">
          <input
            disabled={isPending}
            placeholder="Email"
            className={cn(
              "auth-input dark:text-gray-800",
              isPending && "text-gray-300",
              errors.email && "border-rose-500"
            )}
            {...register("email")}
          />
          <p className="text-xs text-rose-500 pl-1">{errors.email?.message}</p>
        </div>

        <div className="space-y-0.5">
          <input
            disabled={isPending}
            placeholder="Full Name"
            className={cn(
              "auth-input dark:text-gray-800",
              isPending && "text-gray-300",
              errors.fullName && "border-rose-500"
            )}
            {...register("fullName")}
          />
          <p className="text-xs text-rose-500 pl-1">
            {errors.fullName?.message}
          </p>
        </div>

        <div className="space-y-0.5">
          <input
            disabled={isPending}
            placeholder="Username"
            className={cn(
              "auth-input dark:text-gray-800",
              isPending && "text-gray-300",
              errors.username && "border-rose-500"
            )}
            {...register("username")}
          />
          <p className="text-xs text-rose-500 pl-1">
            {errors.username?.message}
          </p>
        </div>

        <div className="space-y-0.5">
          <input
            disabled={isPending}
            type="password"
            placeholder="Password"
            className={cn(
              "auth-input dark:text-gray-800",
              isPending && "text-gray-300",
              errors.password && "border-rose-500"
            )}
            {...register("password")}
          />
          <p className="text-xs text-rose-500 pl-1">
            {errors.password?.message}
          </p>
        </div>
      </div>

      <div className="text-xs text-center space-y-2.5 text-gray-500 dark:text-gray-400 my-3">
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
        disabled={isPending}
        className={cn(
          "border bg-sky-500 text-white font-semibold w-full rounded-lg py-1.5 text-sm",
          isPending && "bg-gray-300"
        )}
      >
        {isPending ? (
          <SvgSpinners3DotsMove className="h-5 w-full" />
        ) : (
          "Sign up"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
