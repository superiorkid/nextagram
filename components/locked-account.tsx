import React from "react";

const LockedAccount = () => {
  return (
    <section className="border p-10 drop-shadow-sm mt-12">
      <div className="max-w-[197px] mx-auto text-center space-y-2">
        <p className="text-sm font-light tracking-wide text-gray-700">
          This account is private
        </p>
        <p className="text-sm font-light tracking-wide text-gray-700">
          Follow to see their photos
        </p>
      </div>
    </section>
  );
};

export default LockedAccount;
