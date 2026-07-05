'use client'

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import { FiTrash2, FiMapPin, FiShoppingBag, FiCreditCard } from "react-icons/fi";

// braintree-web-drop-in-react browser-only hai (window/document use karta hai),
// isliye SSR disable karna zaroori hai warna build crash hoga
const DropIn = dynamic(() => import("braintree-web-drop-in-react"), {
  ssr: false,
});

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      if (!data?.clientToken) {
        toast.error("Could not load payment gateway. Please try again later.");
        return;
      }
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load payment gateway");
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      if (data?.ok) {
        localStorage.removeItem("cart");
        setCart([]);
        router.push("/dashboard/user/orders");
        toast.success("Payment Completed Successfully ");
      } else {
        toast.error(data?.error || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      const serverMessage = error?.response?.data?.error || error?.response?.data?.message;
      toast.error(serverMessage || "Payment failed. Please check your details and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-12 text-center text-white">
        <h1 className="text-3xl font-bold">
          {!auth?.user ? "Hello Guest" : `Hello ${auth?.token && auth?.user?.name}`}
        </h1>
        <p className="mt-2 text-indigo-100">
          {cart?.length
            ? `You have ${cart.length} item${cart.length > 1 ? "s" : ""} in your cart ${
                auth?.token ? "" : "— please login to checkout!"
              }`
            : "Your cart is empty"}
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Cart items */}
          <div className="lg:col-span-2">
            {cart?.length ? (
              <div className="space-y-4">
                {cart.map((p) => (
                  <div
                    key={p._id}
                    className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="h-28 w-28 flex-shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{p.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {p.description.substring(0, 60)}...
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-indigo-600">
                          ${p.price}
                        </span>
                        <button
                          onClick={() => removeCartItem(p._id)}
                          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <FiTrash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
                <FiShoppingBag size={40} className="mb-3 text-gray-300" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Cart Summary</h2>
              <p className="text-sm text-gray-500">Total | Checkout | Payment</p>
              <hr className="my-4 border-gray-100" />

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="text-2xl font-bold text-gray-900">{totalPrice()}</span>
              </div>

              {auth?.user?.address ? (
                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FiMapPin size={16} className="text-indigo-600" />
                    Current Address
                  </div>
                  <p className="text-sm text-gray-600">{auth?.user?.address}</p>
                  <button
                    onClick={() => router.push("/dashboard/user/profile")}
                    className="mt-3 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mt-5">
                  {auth?.token ? (
                    <button
                      onClick={() => router.push("/dashboard/user/profile")}
                      className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/login")}
                      className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}

              <div className="mt-5">
                {!auth?.token || !cart?.length ? (
                  ""
                ) : !clientToken ? (
                  <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
                    Loading payment gateway... if this doesn't load, check your ad-blocker isn't blocking Braintree.
                  </p>
                ) : !auth?.user?.address ? (
                  <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
                    Please add an address above before making payment.
                  </p>
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      onClick={handlePayment}
                      disabled={loading || !instance}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FiCreditCard size={18} />
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;