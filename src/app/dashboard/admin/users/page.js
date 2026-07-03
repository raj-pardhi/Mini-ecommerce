'use client'

import React from 'react'
import AdminMenu from '@/components/Layout/AdminMenu'
import "@/styles/AdminOrder.css"

const Users = () => {
  return (
    <div className='main-alluser'>
      <div className="left-alluser">
        <AdminMenu />
      </div>
      <div className="right-alluser">
        <h1>All users</h1>
      </div>
    </div>
  )
}

export default Users
