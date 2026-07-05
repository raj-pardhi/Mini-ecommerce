'use client'

import React, { useState, useEffect } from "react";
import AdminMenu from "@/components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useRouter, useParams } from "next/navigation";
import { FiUploadCloud, FiSave, FiTrash2 } from "react-icons/fi";
const { Option } = Select;

const UpdateProduct = () => {
  const router = useRouter();
  const params = useParams()
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("")

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setName(data.product.name)
      setId(data.product._id)
      setDescription(data.product.description)
      setPrice(data.product.price)
      setCategory(data.product.category._id)
      setQuantity(data.product.quantity)
      setShipping(data.product.shipping)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, [])

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
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

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ?")
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted successfully");
      router.push("/dashboard/admin/products")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar - AdminMenu manages its own layout, untouched */}
      <div className="flex-shrink-0">
        <AdminMenu />
      </div>

      {/* Right side - form area */}
      <div className="min-w-0 flex-1 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Update Product</h1>
            <p className="mt-1 text-sm text-gray-500">
              Edit the product details or remove it from your store.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <form onSubmit={handleUpdate} className="space-y-6">

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
                    value={category || undefined}
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
                    value={shipping ? "1" : "0"}
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
                    {photo ? photo.name : "Click to upload a new photo"}
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

                <div className="mt-4 flex justify-center">
                  <img
                    src={photo ? URL.createObjectURL(photo) : `/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    className="h-48 rounded-xl object-cover shadow-sm"
                  />
                </div>
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

              {/* Action buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <FiSave size={18} />
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-red-200 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <FiTrash2 size={18} />
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;