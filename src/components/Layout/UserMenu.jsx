'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import "@/styles/usermenu.css"

const UserMenu = () => {
  const pathname = usePathname();

  const isActive = (path) => (pathname === path ? "menulist-userorder active" : "menulist-userorder");

  return (
    <>
      <div className="main-userorder">
        <h4>Dashboard</h4>
        <div className="admin-userorder">
          <Link href="/dashboard/user/profile" className={isActive("/dashboard/user/profile")}>
            Profile</Link>
          <Link href="/dashboard/user/orders" className={isActive("/dashboard/user/orders")}>
            Orders</Link>
        </div>
      </div>
    </>
  )
}

export default UserMenu
