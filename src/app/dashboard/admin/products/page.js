'use client'

import React, { useEffect, useState } from 'react'
import AdminMenu from '@/components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'
import "@/styles/createCategoty.css"

const Product = () => {
  const [products, setProducts] = useState([])

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong")
    }
  }

  useEffect(() => {
    getAllProduct();
  }, [])

  return (
    <div className='main-product'>
      <div className='product-h1'>
        <h1>All Products List</h1>
      </div>
      <div className='left-product'>
        <AdminMenu />
      </div>
      <div className='right-product'>
        <div className='all-product-card'>
          {products?.map(p => (
            <div key={p._id}>
              <Link className='product-link' href={`/dashboard/admin/product/${p.slug}`}>
                <div className="cardproduct">
                  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                    <h4 className="card-title">{p.name}</h4>
                    <h5 className="card-title"><span>MRP:</span> $ {p.price}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product
