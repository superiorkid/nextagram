"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Image as Img, Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import { useTransition } from "react";
import { deletePost } from "@/_actions/post.action";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const postColumns: ColumnDef<
  Prisma.PostGetPayload<{ include: { images: true } }>
>[] = [
  {
    accessorKey: "caption",
    header: () => "Caption",
    cell: ({ row }) => {
      const caption = row.getValue("caption") as string;

      return <div className="line-clamp-2 max-w-md">{caption}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.getValue("location") as string;

      return <div className="capitalize">{location}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Uploaded At",
    cell: ({ row }) => {
      const formattedDate = dayjs(row.getValue("createdAt")).format(
        "DD/MM/YYYY"
      );
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images = row.getValue("images") as Img[];

      return (
        <div className="flex space-x-1">
          {images.map((image, index) => (
            <Image
              key={index}
              width={500}
              height={500}
              src={image.path}
              alt={image.name}
              className="object-cover w-auto h-10 rounded-md"
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isPending, startTransition] = useTransition();

      const handleDelete = () => {
        startTransition(async () => {
          await deletePost(id)
            .then(() => {
              toast.success("post deleted successfully.");
            })
            .catch(() => {
              toast.error("failed to delete post");
            });
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <BsThreeDots className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full p-2 text-left text-sm hover:bg-gray-100">
                    Delete
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-rose-500"
                      onClick={handleDelete}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
