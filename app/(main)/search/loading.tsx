import React from "react";
import Container from "@/components/container";

function Loading() {
  return (
    <Container className="min-h-screen max-w-lg lg:pt-14">
      <div className="sm:border-b lg:border-none shadow-sm px-5 py-1.5">
        <div className="bg-gray-200 animate-pulse rounded-lg w-full h-6 dark:bg-gray-700" />
      </div>
    </Container>
  );
}

export default Loading;
