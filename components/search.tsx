"use client";

import React, { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { getSearchUsers } from "@/_actions/user.action";
import { Prisma, User } from "@prisma/client";
import UserCard from "@/components/user-card";

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
    <React.Fragment>
      <div className="sm:border-b lg:border-none shadow-sm px-5 py-1.5">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
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
              {results.map((user) => (
                <UserCard user={user} key={user.id} />
              ))}
            </div>
          ) : (
            <h1>No users found.</h1>
          ))}
        <div className="pt-2"></div>
      </div>
    </React.Fragment>
  );
}

export default Search;
