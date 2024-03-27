"use client";

import React from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Search = (props: Props) => {
  return (
    <div className="group w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md dark:hover:bg-neutral-800 md:w-auto">
      <div className="flex items-center justify-between">
        <div className="px-6 text-sm font-semibold">Anywhere</div>
        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">
          Any week
        </div>
        <div className="flex items-center gap-3 pl-6 pr-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="hidden sm:block">Add guests</div>
          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
