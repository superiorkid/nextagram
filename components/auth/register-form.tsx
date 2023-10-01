"use client";

import { userRegistration } from "@/_actions/auth.action";
import { TRegister, registerSchema } from "@/lib/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
        <input
          disabled={isPending}
          placeholder="Email"
          className={cn("auth-input", isPending && "text-gray-300")}
          {...register("email")}
        />
        <input
          disabled={isPending}
          placeholder="Full Name"
          className={cn("auth-input", isPending && "text-gray-300")}
          {...register("fullName")}
        />
        <input
          disabled={isPending}
          placeholder="Username"
          className={cn("auth-input", isPending && "text-gray-300")}
          {...register("username")}
        />
        <input
          disabled={isPending}
          type="password"
          placeholder="Password"
          className={cn("auth-input", isPending && "text-gray-300")}
          {...register("password")}
        />
      </div>

      <div className="text-xs text-center space-y-2.5 text-gray-500 my-3">
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
        {isPending ? "..." : "Sign up"}
      </button>
    </form>
  );
};

export default RegisterForm;
