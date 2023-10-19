import React from "react";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex justify-center items-center flex-col mt-10 space-y-3">
      <h2 className="text-3xl font-bold">
        Sorry this page isn{"'"}t available
      </h2>
      <p className="font-light">
        The link you followed may be broken, or the page may have been removed.{" "}
        <Link href="/">Go back to Nextagram</Link>.
      </p>
    </div>
  );
}

export default NotFoundPage;
