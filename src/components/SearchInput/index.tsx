import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
const SearchInput = () => {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
          <FaMagnifyingGlass />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full px-4 py-3 ps-12 text-sm outline-none text-gray-900 border border-none rounded-3xl bg-gray-100 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          placeholder="Search"
          required
        />
      </div>
    </div>
  );
};

export default SearchInput;
