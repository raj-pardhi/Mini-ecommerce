"use client";

import React from "react";
import { useSearch } from "@/context/search";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      router.push("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full items-center b gap-2"
    >
      {/* Input with leading icon */}
      <div className="group relative flex-1">
        <FiSearch
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-indigo-500"
        />
        <input
          type="search"
          placeholder="Search for products"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/70 py-2.5 pl-10 pr-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition duration-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40 active:translate-y-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;