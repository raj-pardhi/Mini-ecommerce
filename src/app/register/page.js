'use client'

import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import "@/styles/AuthStyles.css"
import { useRouter } from 'next/navigation'

const Register = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [phone, setphone] = useState("")
  const [address, setaddress] = useState("")
  const [answer, setAnswer] = useState("")

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register',
        {
          name,
          email,
          password,
          phone,
          address,
          answer
        })
      if (res && res.data.success) {
        toast.success("Register Successfully please login")
        router.push('/login')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  }

  return (
    <div className='form-container'>
      <div className='left'>
        <div className="box">
          <div className="nav-bar">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <a href='#'>
              <img src="/images/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u-removebg-preview.png" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className='right'>
        <div className='card-reg'>
          <img src="/images/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u-removebg-preview.png" alt="" />

          <form onSubmit={handleSubmit}>
            <div className="">
              <input type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder='Enter your Name'
                required
                autoFocus
              />
            </div>
            <div className="">
              <input type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="form-control" id="exampleInputEmail1"
                placeholder='Enter your Email'
                required
              />
            </div>
            <div className="">
              <input type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder='Enter your Password'
                required
              />
            </div>
            <div className="">
              <input type="text"
                value={phone}
                required
                onChange={(e) => setphone(e.target.value)}
                className="form-control" id="exampleInputEmail1"
                placeholder='Enter your Phone' />
            </div>
            <div className="mb-3">
              <input type="text"
                value={address}
                required
                onChange={(e) => setaddress(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder='Enter your Address' />
            </div>

            <div className="mb-3">
              <input type="text"
                value={answer}
                required
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder='What is Your pet name' />
            </div>
            <button type="submit" className="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
