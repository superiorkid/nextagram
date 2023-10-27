import React from "react";
import Container from "@/components/container";

function Loading() {
  return (
    <Container className="max-w-screen-lg min-h-screen my-5">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md w-full aspect-square"
          />
        ))}
      </div>
    </Container>
  );
}

export default Loading;
