import React from "react";

function Loading() {
  return (
    <main className="mt-14 min-h-[15dvh] max-w-lg">
      <div className="h-8 w-40 bg-gray-200 animate-pulse" />

      <div className="mt-8">
        <div className="flex items-center space-x-8">
          <div className="w-32 flex justify-end">
            <div className="h-10 w-10 rounded-full animate-pulse bg-gray-100" />
          </div>
          <div className="flex-1 leading-tight">
            <div className="h-6 w-32" />
          </div>
        </div>
        <div className="space-y-7 mt-7">
          <div className="flex space-x-8 items-center">
            <div className="w-32 h-6 animate-pulse rounded-md bg-gray-100" />
            <div className="w-72 h-8 animate-pulse rounded-md bg-gray-100" />
          </div>
          <div className="flex space-x-8 items-center">
            <div className="w-32 h-6 animate-pulse rounded-md bg-gray-100" />
            <div className="w-72 h-8 animate-pulse rounded-md bg-gray-100" />
          </div>
          <div className="flex space-x-8 items-center">
            <div className="w-32 h-6 animate-pulse rounded-md bg-gray-100" />
            <div className="w-72 h-40 animate-pulse rounded-md bg-gray-100" />
          </div>

          <div className="flex space-x-8">
            <div className="w-32 h-6 animate-pulse rounded-md bg-gray-100" />
            <div className="w-72 h-8 animate-pulse rounded-md bg-gray-100" />
          </div>

          <div className="flex space-x-8">
            <div className="w-32 text-end"></div>
            <div className="w-20 h-8 bg-gray-100 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Loading;
