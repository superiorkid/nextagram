"use client";

import { updateProfile } from "@/_actions/user.action";
import { cn } from "@/lib/utils";
import {
  TProfileWithoutImageSchema,
  profileWithoutImageSchema,
} from "@/lib/validations/profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  currentUser: User | null;
}

const EditProfileForm = ({ currentUser }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<TProfileWithoutImageSchema>({
    resolver: zodResolver(profileWithoutImageSchema),
    defaultValues: {
      fullName: currentUser?.fullName,
      website: currentUser?.website,
      bio: currentUser?.bio,
      gender: currentUser?.gender,
    },
  });

  const onSubmit = (data: TProfileWithoutImageSchema) => {
    startTransition(async () => {
      await updateProfile(data)
        .then(() => {
          toast.success("update profile successfully");
          router.refresh();
        })
        .catch(() => {
          toast.error("failed to update profile");
          reset();
        });
    });
  };

  const genderOptions = useMemo<{ label: string; value: string | number }[]>(
    () => [
      {
        label: "Select your gender",
        value: "",
      },
      {
        label: "Male",
        value: "MALE",
      },
      {
        label: "Female",
        value: "FEMALE",
      },
    ],
    []
  );

  return (
    <form className="space-y-7 mt-7" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-8 items-center">
        <label className="w-32 text-end font-semibold text-sm">Full Name</label>
        <input
          className="flex-1 border text-sm rounded-md placeholder:text-sm px-3 py-1 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-0"
          placeholder="Full Name"
          {...register("fullName")}
        />
      </div>
      <div className="flex space-x-8 items-center">
        <label className="w-32 text-end font-semibold text-sm">Website</label>
        <input
          className="flex-1 border text-sm rounded-md placeholder:text-sm px-3 py-1 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-0"
          placeholder="Website"
          {...register("website")}
        />
      </div>
      <div className="flex space-x-8 items-center">
        <label className="w-32 text-end font-semibold text-sm">Bio</label>
        <textarea
          placeholder="Bio"
          className="flex-1 border text-sm rounded-md placeholder:text-sm px-3 py-1 focus:outline-none focus:ring-2 dark:bg-gray-700 focus:ring-sky-500 focus:ring-offset-0 h-28 resize-y"
          {...register("bio")}
        />
      </div>

      <div className="flex space-x-8">
        <label className="w-32 text-end font-semibold text-sm">Gender</label>
        <div>
          <select
            className="w-full bg-white border dark:bg-gray-700 p-1.5 rounded-md space-y-3"
            {...register("gender")}
          >
            {genderOptions.map((option, index) => (
              <option value={option.value} key={index} disabled={index === 0}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-gray-500 text-xs tracking-wide mt-2 font-light">
            This won{"'"}t be part of your public profile
          </p>
        </div>
      </div>

      <div className="flex space-x-8">
        <label className="w-32 text-end">&nbsp;</label>
        <button
          type="submit"
          disabled={!isDirty || isPending}
          className={cn(
            "bg-sky-500 rounded-lg text-sm font-bold py-1 px-5 text-white dark:bg-gray-700",
            (isPending || !isDirty) && "bg-gray-300"
          )}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
