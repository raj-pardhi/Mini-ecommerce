'use client'

import React from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/context/search";
import { useCart } from "@/context/cart";
import toast from "react-hot-toast";
import { FiSearch, FiShoppingCart, FiArrowRight, FiPackage } from "react-icons/fi";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const router = useRouter();

  const handleAddToCart = (p) => {
    setCart([...cart, p]);
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
    toast.success("Item Added to cart");
  };

  return (
    <div className="min-h-screen bg-[#196CCD]">
      {/* Hero header - same brand blue, kept as requested */}
      <div className="px-5 pb-14 pt-16 text-center text-white">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
          <FiSearch size={26} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Search Results
        </h1>
        <p className="mt-2 text-lg text-white/80">
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length} result${values?.results.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-5 pb-16">
        {values?.results.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {values.results.map((p) => (
              <div
                key={p._id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h4 className="font-semibold text-gray-900">{p.name}</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="mt-2 text-lg font-bold text-[#196CCD]">
                    MRP: ${p.price}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => router.push(`/product/${p.slug}`)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border-2 border-[#196CCD] py-2 text-sm font-semibold text-[#196CCD] transition hover:bg-[#196CCD] hover:text-white"
                    >
                      Details
                      <FiArrowRight size={14} />
                    </button>
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#196CCD] py-2 text-sm font-semibold text-white transition hover:bg-[#12539e]"
                    >
                      <FiShoppingCart size={14} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 py-20 text-center backdrop-blur">
            <FiPackage size={40} className="mb-3 text-white/60" />
            <p className="text-white/80">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;