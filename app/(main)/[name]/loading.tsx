import React from "react";
import Container from "@/components/container";

function Loading() {
  return (
    <Container className="max-w-screen-lg lg:px-3 pt-0 lg:pt-7 pb-6 min-h-screen">
      <section className="max-w-screen-md mx-auto flex space-x-20">
        <div className="h-28 w-28 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-10 items-center">
            <div className="w-56 h-6 bg-gray-200 animate-pulse" />
            <div className="w-72 h-6 bg-gray-200 animate-pulse" />
            <div className="w-36 h-6 bg-gray-200 animate-pulse" />
          </div>
          <div className="flex space-x-10 items-center">
            <div className="w-32 h-6 bg-gray-200 animate-pulse" />
            <div className="w-40 h-6 bg-gray-200 animate-pulse" />
            <div className="w-44 h-6 bg-gray-200 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="w-36 h-6 bg-gray-200 animate-pulse" />
            <div className="w-32 h-6 bg-gray-200 animate-pulse" />
          </div>
          <div className="w-24 h-4 bg-gray-200 animate-pulse" />
        </div>
      </section>
    </Container>
  );
}

export default Loading;
