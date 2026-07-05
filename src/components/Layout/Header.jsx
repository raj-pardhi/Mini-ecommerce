"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { Badge } from "antd";
import toast from "react-hot-toast";

import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import useCategory from "@/hooks/useCategory";
import SearchInput from "@/components/Form/SearchInput";

const Header = () => {
  const pathname = usePathname();

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <header className="sticky top-0  z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className=" max-w-full  px-5">
        <div className="flex h-20 items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <HiOutlineShoppingCart size={24} />
            </span>
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              ShoeMart
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">

            <div className="w-full max-w-xs">
              <SearchInput />
            </div>

            <nav className="flex items-center gap-1 pl-2">
              <Link
                href="/"
                className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/70"
                }`}
              >
                Home
                {pathname === "/" && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-indigo-500 to-violet-500" />
                )}
              </Link>

              {/* Categories */}
              <div className="relative">
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-indigo-50/70 hover:text-indigo-600"
                >
                  Categories
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      categoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {categoryOpen && (
                  <div className="absolute right-0 mt-3 w-60 origin-top-right overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-2xl shadow-gray-900/10 ring-1 ring-black/5">
                    <Link
                      href="/categories"
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      All Categories
                    </Link>

                    <div className="my-1 h-px bg-gray-100" />

                    {categories?.map((c) => (
                      <Link
                        key={c._id}
                        href={`/category/${c.slug}`}
                        className="block rounded-xl px-3.5 py-2.5 text-sm text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {!auth.user ? (
              <Link
                href="/login"
                className="ml-1 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                Login
              </Link>
            ) : (
              <div className="relative ml-1">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/60 py-1.5 pl-1.5 pr-3 text-sm font-semibold text-gray-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50/50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 text-xs font-bold uppercase text-white">
                    {auth.user.name?.charAt(0)}
                  </span>
                  <span className="max-w-[120px] truncate">{auth.user.name}</span>
                  <FiChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 origin-top-right overflow-hidden rounded-2xl border border-gray-100 bg-white p-1.5 shadow-2xl shadow-gray-900/10 ring-1 ring-black/5">

                    <Link
                      href={`/dashboard/${
                        auth.user.role === 1 ? "admin" : "user"
                      }`}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Dashboard
                    </Link>

                    <div className="my-1 h-px bg-gray-100" />

                    <button
                      onClick={handleLogout}
                      className="w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>
            )}

            <Badge count={cart?.length} showZero color="#6366f1">
              <Link
                href="/cart"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/60 text-gray-700 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <HiOutlineShoppingCart size={22} />
              </Link>
            </Badge>
          </div>

          {/* Mobile Button */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}

        {mobileMenu && (
          <div className="space-y-1 border-t border-gray-100 py-5 lg:hidden">

            <div className="pb-2">
              <SearchInput />
            </div>

            <Link
              href="/"
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            >
              Home
            </Link>

            <Link
              href="/categories"
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            >
              Categories
            </Link>

            <div className="space-y-0.5 pl-3">
              {categories?.map((c) => (
                <Link
                  key={c._id}
                  href={`/category/${c.slug}`}
                  className="block rounded-xl px-4 py-2 text-sm text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {c.name}
                </Link>
              ))}
            </div>

            <div className="my-2 h-px bg-gray-100" />

            {!auth.user ? (
              <Link
                href="/login"
                className="block rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/25"
              >
                Login
              </Link>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 px-4 py-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 text-sm font-bold uppercase text-white">
                    {auth.user.name?.charAt(0)}
                  </span>
                  <p className="font-semibold text-gray-800">{auth.user.name}</p>
                </div>

                <Link
                  href={`/dashboard/${
                    auth.user.role === 1 ? "admin" : "user"
                  }`}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}

            <div className="pt-2">
              <Badge count={cart?.length} showZero color="#6366f1">
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <HiOutlineShoppingCart size={22} />
                  Cart
                </Link>
              </Badge>
            </div>

          </div>
        )}
      </div>
    </header>
  );
};

export default Header;