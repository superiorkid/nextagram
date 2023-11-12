import React from "react";
import { DataTable } from "../data-table";
import { postColumns } from "./post-table-column";
import { getCurrentUserPost } from "@/_actions/user.action";

const PostTable = async () => {
  const posts = await getCurrentUserPost();

  return (
    <section className="border shadow-sm rounded-md p-5">
      <h1 className="font-bold text-2xl">posts</h1>

      <div className="mt-5">
        <DataTable columns={postColumns} data={posts} />
      </div>
    </section>
  );
};

export default PostTable;
