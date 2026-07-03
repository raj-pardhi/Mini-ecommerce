'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import "@/styles/AdminDashboard.css"

const AdminMenu = () => {
  const pathname = usePathname();

  const isActive = (path) => (pathname === path ? "menulist active" : "menulist");

  return (
    <>
      <div className="www">
        <div className="admin-menu">
          <h4>Admin Panel</h4>
          <div className='admin-list'>
            <Link href="/dashboard/admin/create-category" className={isActive("/dashboard/admin/create-category")}>
              CREATE CATEGORY</Link>
            <Link href="/dashboard/admin/products" className={isActive("/dashboard/admin/products")}>
              PRODUCTS</Link>
            <Link href="/dashboard/admin/orders" className={isActive("/dashboard/admin/orders")}>
              ORDERS</Link>
            <Link href="/dashboard/admin/create-product" className={isActive("/dashboard/admin/create-product")}>
              CREATE PRODUCT</Link>
            <Link href="/dashboard/admin/users" className={isActive("/dashboard/admin/users")}>
              USERS</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminMenu
