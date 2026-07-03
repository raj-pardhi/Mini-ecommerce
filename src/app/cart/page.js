'use client'

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import "@/styles/CartPage.css"

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
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
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
      localStorage.removeItem("cart");
      setCart([]);
      router.push("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" cart-page">
      <div className="cart-main">
        <div className="card-main2">
          <h1 className="text-center">
            {!auth?.user
              ? "Hello Guest"
              : `Hello  ${auth?.token && auth?.user?.name}`}
            <p className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                }`
                : " Your Cart Is Empty"}
            </p>
          </h1>
        </div>
      </div>
      <div className="container ">
        <div className="row-cartmain ">
          <div className="card-cartpage2">
            {cart?.map((p) => (
              <div className="card-cartpage" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="text-cartpage">
                  <h5>{p.name}</h5>
                  <p>{p.description.substring(0, 30)}</p>
                  <h6>Price :$ {p.price}</h6>

                  <div className="cart-remove-btn">
                    <button
                      className="remove-cartbtn"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="right-cartpage">
            <h2>CART SUMMERY</h2>
            <h5>Total | Checkout | Payment</h5>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="price-cartpage">
                  <h4>Current Address</h4>
                  <h6>{auth?.user?.address}</h6>
                  <button
                    className="updateadd-cartpage"
                    onClick={() => router.push("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => router.push("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => router.push("/login")}
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !auth?.token || !cart?.length ? (
                ""
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
                    className="makepaymentbtn"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
