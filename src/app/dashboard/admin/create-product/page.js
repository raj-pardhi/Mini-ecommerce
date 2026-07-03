'use client'

import React, { useState, useEffect } from "react";
import AdminMenu from "@/components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import "@/styles/createProduct.css"
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
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        router.push("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="main-createproduct">
      <div className="left-createproduct">
        <AdminMenu />
      </div>
      <div className="right-createproduct">
        <h2>CREATE PRODUCT</h2>
        <div className="card-createproduct">
          <div className="row-input">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="select-menu"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="product-uploadphoto">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="input-main">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="inputmenu"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="textarea-main">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="for"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="in">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="inputmenu"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="in">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="inputmenu"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="shiping-product">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="inputmenu"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="createproduct-btn" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
