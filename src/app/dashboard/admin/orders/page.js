'use client'

import React, { useEffect, useState } from 'react'
import AdminMenu from '@/components/Layout/AdminMenu'
import axios from 'axios'
import { useAuth } from '@/context/auth'
import moment from "moment"
import { Select } from 'antd'
import '@/styles/AdminOrder.css'
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "delivered", "cancel"])
  const [changeStatus, setChangeStatus] = useState("")
  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth()

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/all-orders')
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-adminorder">
      <div className='allorders'>
        <h1>All Orders</h1>
      </div>
      <div className='left-adminorder'>
        <AdminMenu />
      </div>
      <div className='right-adminorder'>
        {
          orders?.map((o, i) => {
            return (
              <div className='card-adminorder' key={o._id}>
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
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="container-order">
                  {o?.products?.map((p, i) => (
                    <div className="card-in" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                      </div>
                      <div className="order-text">
                        <h5>{p.name}</h5>
                        <p>{p.description.substring(0, 30)}</p>
                        <p><span>Price</span> :$ {p.price}</p>
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
  )
}

export default AdminOrders
