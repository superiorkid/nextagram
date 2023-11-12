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
    id: "actions",
    cell: ({ row }) => {
      const handleDelete = () => {
        console.log("delete btn clicked!!!");
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
              <button
                onClick={handleDelete}
                className="w-full hover:cursor-pointer"
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
