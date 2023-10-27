"use client";

import { cn } from "@/lib/utils";
import React, { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { commentSchema, TComment } from "@/lib/validations/comment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComment } from "@/_actions/comment.action";
import toast from "react-hot-toast";

interface Props {
  postId: string;
  inputStyles?: string;
  buttonStyles?: string;
}

const CommentForm = ({ inputStyles, buttonStyles, postId }: Props) => {
  const [text, setText] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TComment>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText((text) => value);
  };

  const commentSend = (data: TComment) => {
    const formData = new FormData();
    formData.append("comment", data.content);

    startTransition(async () => {
      await createComment(formData, postId)
        .then((response) => {
          console.log("comment success");
          reset();
        })
        .catch((error) => {
          console.log(error);
          toast.error("something went wrong");
        });
    });
  };

  return (
    <form className="relative" onSubmit={handleSubmit(commentSend)}>
      <input
        placeholder="Add a comment..."
        {...register("content", { onChange: handleChange })}
        className={cn(
          "w-full pr-3 py-1 focus:outline-none dark:bg-transparent",
          inputStyles
        )}
        disabled={isPending}
      />
      <button
        type="submit"
        className={cn(
          "absolute right-5 top-1/2 -translate-y-1/2 font-bold text-sky-500 hidden",
          text.length && "flex"
        )}
        disabled={isPending}
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
