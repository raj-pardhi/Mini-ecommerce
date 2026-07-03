'use client'

import React from 'react'
import AdminMenu from '@/components/Layout/AdminMenu'
import { useAuth } from '@/context/auth'
import '@/styles/AdminDashboard.css'

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <div className='admin-main'>
      <div className='left-admin'>
        <AdminMenu />
      </div>
      <div className='right-admin'>
        <div className='admin-card'>
          <h2>Admin Details</h2>
          <h3> Name : {auth?.user?.name}</h3>
          <h3> Email : {auth?.user?.email}</h3>
          <h3> Contact : {auth?.user?.phone}</h3>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
