'use client'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useCart } from '@/context/cart'
import { FiShoppingCart, FiTruck, FiRefreshCw, FiShield, FiPlus, FiMinus, FiCheck } from 'react-icons/fi'
import "@/styles/productDeatail.css"

const ProductDetails = () => {
  const params = useParams()
  const router = useRouter()
  const [cart, setCart] = useCart()
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [zoomActive, setZoomActive] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })

  const ctaRef = useRef(null);
  const imageFrameRef = useRef(null);

  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
      getSimilarProduct(data?.product._id, data?.product.category._id)
    } catch (error) {
      console.log(error)
    }
  }

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error)
    }
  }

  // Sticky mini cart-bar: appears once the main CTA scrolls out of view
  useEffect(() => {
    if (!ctaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, [product]);

  const maxQuantity = typeof product?.quantity === "number" && product.quantity > 0
    ? product.quantity
    : 99;

  const increment = () => setQuantity((q) => Math.min(q + 1, maxQuantity));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    const itemsToAdd = Array(quantity).fill(product);
    const updatedCart = [...cart, ...itemsToAdd];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${quantity} item${quantity > 1 ? "s" : ""} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const handleZoomMove = (e) => {
    const rect = imageFrameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  const photoUrl = `/api/v1/product/product-photo/${product._id}`;
  const formattedPrice = typeof product.price === "number"
    ? product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : "";

  return (
    <div className='product-details-page'>

      {/* Breadcrumb */}
      <div className='pd-breadcrumb'>
        <span onClick={() => router.push('/')}>Home</span>
        {product?.category?.name && (
          <>
            <span className='sep'>/</span>
            <span>{product.category.name}</span>
          </>
        )}
        <span className='sep'>/</span>
        <span className='current'>{product?.name}</span>
      </div>

      {/* Main product section */}
      <div className='pd-main'>

        <div className='pd-gallery'>
          <div
            className='pd-image-frame'
            ref={imageFrameRef}
            onMouseEnter={() => setZoomActive(true)}
            onMouseLeave={() => setZoomActive(false)}
            onMouseMove={handleZoomMove}
          >
            <img
              src={photoUrl}
              alt={product.name}
              className='pd-image'
            />
          </div>

          {/* Magnified zoom pane — desktop only */}
          <div
            className={`pd-zoom-pane ${zoomActive ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${photoUrl})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            }}
          />
        </div>

        <div className='pd-info'>
          {product?.category?.name && (
            <span className='pd-category-badge'>{product.category.name}</span>
          )}

          <h1 className='pd-name'>{product.name}</h1>

          <div className='pd-price-row'>
            <span className='pd-price'>{formattedPrice}</span>
            {typeof product.quantity === "number" && product.quantity > 0 && product.quantity <= 10 && (
              <span className='pd-stock-flag'>Only {product.quantity} left</span>
            )}
          </div>

          <p className='pd-description'>{product.description}</p>

          <div className='pd-perks'>
            <div className='perk'>
              <FiTruck />
              <span>Free Shipping</span>
            </div>
            <div className='perk'>
              <FiRefreshCw />
              <span>Easy Returns</span>
            </div>
            <div className='perk'>
              <FiShield />
              <span>Secure Payment</span>
            </div>
          </div>

          <div className='pd-actions' ref={ctaRef}>
            <div className='qty-stepper'>
              <button type="button" onClick={decrement} aria-label="Decrease quantity">
                <FiMinus />
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={increment} aria-label="Increase quantity">
                <FiPlus />
              </button>
            </div>

            <button
              className={`btn-add-cart ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              type="button"
            >
              {added ? <FiCheck /> : <FiShoppingCart />}
              <span>{added ? "Added" : "Add to Cart"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Similar products — horizontal scroll-snap carousel */}
      <div className='pd-similar'>
        <h2 className='pd-similar-heading'>You may also like</h2>

        {relatedProducts.length < 1 && (
          <p className='pd-no-similar'>No similar products found</p>
        )}

        <div className='pd-similar-scroll'>
          {relatedProducts?.map((p) => (
            <div className='related-card' key={p._id}>
              <div className='related-img-wrap'>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className='related-img'
                />
              </div>
              <div className='related-body'>
                <div className='related-name-price'>
                  <h3 className='related-name'>{p.name}</h3>
                  <span className='related-price'>
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <p className='related-desc'>
                  {p.description.substring(0, 60)}...
                </p>
                <button
                  className='btn-view-details'
                  onClick={() => router.push(`/product/${p.slug}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky mini cart bar */}
      <div className={`pd-sticky-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className='sticky-bar-inner'>
          <img src={photoUrl} alt={product.name} className='sticky-thumb' />
          <div className='sticky-info'>
            <span className='sticky-name'>{product.name}</span>
            <span className='sticky-price'>{formattedPrice}</span>
          </div>
          <button className='btn-add-cart small' onClick={handleAddToCart} type="button">
            {added ? <FiCheck /> : <FiShoppingCart />}
            <span>{added ? "Added" : "Add to Cart"}</span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductDetails