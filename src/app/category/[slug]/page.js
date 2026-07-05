'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { FiArrowRight, FiPackage } from 'react-icons/fi'

const CategoryProduct = () => {
  const params = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])

  useEffect(() => {
    if (params?.slug) getProductByCat()
  }, [params?.slug])

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-14 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">{category?.name}</h1>
        <p className="mt-2 text-indigo-100">{products?.length} result{products?.length === 1 ? "" : "s"} found</p>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10">
        {products?.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900">{p.name}</h4>
                    <span className="whitespace-nowrap font-bold text-indigo-600">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>
                  <p className="mt-1 flex-1 text-sm text-gray-500">
                    {p.description.substring(0, 60)}...
                  </p>

                  <button
                    onClick={() => router.push(`/product/${p.slug}`)}
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    More Details
                    <FiArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
            <FiPackage size={40} className="mb-3 text-gray-300" />
            <p className="text-gray-500">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryProduct