"use client";

import React, { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { getSearchUsers } from "@/_actions/user.action";
import { Prisma, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

function Search() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [results, setResults] = useState<
    | Prisma.UserGetPayload<{
        include: {
          posts: {
            include: {
              images: true;
            };
          };
          followers: true;
          following: true;
          _count: {
            select: {
              posts: true;
              followers: true;
              following: true;
            };
          };
        };
      }>[]
  >([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm((search) => event.target.value);
  };

  useEffect(() => {
    const searchHN = async () => {
      let results: User[] | [] = [];
      if (debouncedSearchTerm) {
        const data = await getSearchUsers(debouncedSearchTerm);
        results = data || [];
      }

      // @ts-ignore
      setResults((prevState) => results);
    };

    searchHN();
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="sm:border-b lg:border-none shadow-sm px-5 py-1.5">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search user..."
          className="w-full focus:outline-none border rounded-md py-0.5 px-3 border-gray-400 focus:ring-2 ring-gray-400"
          onChange={handleChange}
        />
      </div>

      <div className="px-5 pt-3.5">
        {debouncedSearchTerm && (
          <h3 className="text-lg font-bold mb-1.5">results for {searchTerm}</h3>
        )}
        {debouncedSearchTerm &&
          (results.length ? (
            <div className="space-y-2">
              {results.map((user, index) => (
                <div className="flex space-x-2.5 items-center" key={index}>
                  <div className="relative w-12 h-12">
                    <Image
                      fill
                      src={
                        user?.image ??
                        `https://api.dicebear.com/7.x/micah/png?seed=${user?.email}`
                      }
                      alt={`${user.name} photo`}
                      className="object-cover rounded-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="text-sm">
                    <Link
                      href={`/${user.name}`}
                      className="font-bold tracking-wide"
                    >
                      {user.name}
                    </Link>
                    <p className="text-gray-500 text-xs dark:text-gray-400">
                      Followed by _danu.ar
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1>No users found.</h1>
          ))}
        <div className="pt-2"></div>
      </div>
    </main>
  );
}

export default Search;
