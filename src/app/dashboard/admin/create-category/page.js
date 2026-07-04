'use client'

import React, { useEffect, useState } from "react";
import AdminMenu from "@/components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "@/components/Form/CategoryForm";
import { Modal } from "antd";
import { FiEdit2, FiTrash2, FiTag } from "react-icons/fi";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <div className=" flex mx-auto grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] bg-gray-50">
      <div>
          <AdminMenu />
        </div>
      <div className=" max-w-full w-full px-5  pt-20 ">

        {/* Sidebar */}
        

        {/* Main content */}
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
            <p className="mt-1 text-sm text-gray-500">
              Add new categories or update existing ones.
            </p>
          </div>

          {/* Add category card */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Add a new category
            </h2>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>

          {/* Category list */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                All categories
              </h2>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                {categories?.length || 0} total
              </span>
            </div>

            {categories?.length ? (
              <ul className="divide-y divide-gray-100">
                {categories.map((c) => (
                  <li
                    key={c._id}
                    className="flex items-center justify-between px-6 py-4 transition hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <FiTag size={16} />
                      </span>
                      <span className="font-medium text-gray-800">{c.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <FiEdit2 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-14 text-center">
                <p className="text-sm text-gray-500">No categories yet — add your first one above.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
        title={<span className="text-base font-semibold text-gray-900">Edit category</span>}
        centered
      >
        <div className="pt-2">
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateCategory;