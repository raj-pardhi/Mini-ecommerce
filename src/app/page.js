'use client'

import React, { useEffect, useState } from 'react'
import { Checkbox, Radio } from "antd";
import { AiOutlineReload } from "react-icons/ai";
import { useCart } from '@/context/cart';
import { Prices } from "@/components/Prices";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import "@/styles/Homepage.css"

const HomePage = () => {
  const router = useRouter();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getAllcategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category")
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllcategory()
    getTotal();
  }, [])

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page])

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all)
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts()
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="home-page">
      <div className="left-home">
        <div className="filters">
          <h4>CATEGORY</h4>
          <div className='d-flex flex-column'>
            {categories?.map((c) => (
              <Checkbox key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className='mt-4'>PRICE</h4>
          <div className=''>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-colomn'>
            <button
              className='homeresetbtn'
              onClick={() => window.location.reload()}
            >RESET FILTER</button>
          </div>
        </div>
      </div>

      <div className="right-home">
        <div className="">
          <div className='main-homepage'>
            <div className="left-main">
              <div className="left-in-main">
                <h5>Explore the <span>Limited</span> edition</h5>
                <h1>
                  New <span>Limited</span> <br />
                  edition
                </h1>
                <button>Shop Now</button>
              </div>
            </div>

            <div className="right-main">
              <div className="cnt">
                <div className="elem7">
                  <div className="photo-main">
                    <img src="https://www.sneakerfiles.com/wp-content/uploads/2018/07/nike-lebron-soldier-12-anchor-ao2609-401.jpg" alt="" />
                  </div>
                  <div className="elem-data">
                    <a href="http://localhost:3000/post/65792c521d9387372fee6b0d">LeBron Soldier
                      12(Team)</a>
                    <h5>Men's Basketball Shoes</h5>
                  </div>
                </div>
                <div className="elem7">
                  <div className="photo-main">
                    <img src="https://sneakernews.com/wp-content/uploads/2018/04/nike-lebron-soldier-12-a04055-100-1.jpg" alt="" />
                  </div>
                  <div className="elem-data">
                    <a href="http://localhost:3000/post/65792bee1d9387372fee6aef">LeBron Soldier
                      12(Team)</a>
                    <h5>Men's Basketball Shoes</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='allproduct-h1'>
            <h1>FEATURED PRODUCTS</h1>
          </div>
          <div className='grid sm:grid-cols-1  lg:grid-cols-3'>
            {products?.map((p) => (
              <div className='cardhome ' key={p._id}>
                <div className="homepic">
                  <img src={`/api/v1/product/product-photo/${p._id}`}
                    className='cardhomeimg'
                    alt={p.name} />
                </div>

                <div className='hometext'>
                  <div className='card-name-price'>
                    <h4 className='card-title'>{p.name}</h4>
                    <h5 className='card-title card-price'>
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p>
                    {p.description.substring(0, 40)}...
                  </p>
                  <div className='homebtn'>
                    <button className='homethumb'
                      onClick={() => router.push(`/product/${p.slug}`)}
                    >
                      More
                    </button>
                    <button
                      className='homeaddbtn'
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]))
                        toast.success("Item Added to cart")
                      }}
                    >
                      ADD
                    </button>
                  </div>
                </div>

                <div className="text-back">
                  <h4><span>Size</span> - 6,7,8,9</h4>
                </div>
              </div>
            ))}
          </div>

          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button
                className='btn loadmore'
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
