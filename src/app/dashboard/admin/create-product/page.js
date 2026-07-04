'use client'

import React, { useState, useEffect } from "react";
import AdminMenu from "@/components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiPackage } from "react-icons/fi";
const { Option } = Select;

const CreateProduct = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        router.push("/dashboard/admin/products");
      } else {
        toast.error(data?.message || data?.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      const serverMessage = error?.response?.data?.error || error?.response?.data?.message;
      toast.error(serverMessage || "something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar - AdminMenu manages its own width/layout internally, untouched */}
      <div className="flex-shrink-0">
        <AdminMenu />
      </div>

      {/* Right side - form area, takes remaining space */}
      <div className="min-w-0 flex-1 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to add a new product to your store.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <form onSubmit={handleCreate} className="space-y-6">

              {/* Category + Shipping */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <Select
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="w-full"
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Shipping available
                  </label>
                  <Select
                    placeholder="Select shipping"
                    size="large"
                    showSearch
                    className="w-full"
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
              </div>

              {/* Photo upload */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Product photo
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center transition hover:border-indigo-300 hover:bg-indigo-50">
                  <FiUploadCloud size={28} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">
                    {photo ? photo.name : "Click to upload a photo"}
                  </span>
                  <span className="text-xs text-gray-400">PNG, JPG up to 1MB</span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>

                {photo && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="h-48 rounded-xl object-cover shadow-sm"
                    />
                  </div>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Product name
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="e.g. Wireless Headphones"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  placeholder="Write a short description of the product"
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Price + Quantity */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={price}
                    placeholder="0.00"
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    placeholder="0"
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <FiPackage size={18} />
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;