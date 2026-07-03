'use client'

import React, { useEffect, useState } from 'react'
import UserMenu from '@/components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '@/context/auth'
import moment from "moment"
import "@/styles/userOrder.css"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth()

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/orders')
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  return (
    <div className="container-fluid">
      <div className="main-order">
        <div className="left-order">
          <UserMenu />
        </div>
        <div className="right-userorder">
          <h1 className='text-center'>All Orders</h1>
          {
            orders?.map((o, i) => {
              return (
                <div className='bo' key={o._id}>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Payment</th>
                        <th scope='col'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i + 1}</th>
                        <th>{o?.status}</th>
                        <th>{o?.buyer?.name}</th>
                        <th>{moment(o?.createAt).fromNow()}</th>
                        <th>{o?.payment.success ? "Success" : "Failed"}</th>
                        <th>{o?.products?.length}</th>
                      </tr>
                    </tbody>
                  </table>

                  <div className="c">
                    {o?.products?.map((p, i) => (
                      <div className="card-userorder" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                          />
                        </div>
                        <div className="text-userorder">
                          <h4>{p.name}</h4>
                          <h5>{p.description.substring(0, 30)}</h5>
                          <p>Price : ${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Orders
