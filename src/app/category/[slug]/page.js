'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import "@/styles/category.css"

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
    <div className='main-categoryproduct'>
      <div className="topup">
        <h1>{category?.name}</h1>
        <h6>{products?.length} result found</h6>
      </div>
      <div className="top-categoryproduct">
        <div className="c">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card-categoryproduct" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-textcategory">
                  <div className="card-name-price">
                    <h4 className="card-title">{p.name}</h4>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="categoryproduct-btn"
                      onClick={() => router.push(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
