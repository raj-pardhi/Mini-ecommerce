'use client'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import "@/styles/AuthStyles.css"
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/navigation'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const Login = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [auth, setauth] = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login',
        { email, password, })
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setauth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data))
        router.push('/')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    }
  }

  return (
    <div className='login-page'>

      {/* Decorative animated background blobs (brand panel only) */}
      <div className='login-blobs' aria-hidden="true">
        <span className='blob blob-1'></span>
        <span className='blob blob-2'></span>
        <span className='blob blob-3'></span>
      </div>

      <div className='login-wrapper'>

        {/* Left brand panel */}
        <div className='login-brand'>
          <div className='login-brand-inner'>
            <div className='login-logo'>StepUp</div>
            <h1>Step Into<br />Your Style</h1>
            <p>Sign in to pick up right where you left off — your cart, your orders, your fits.</p>
          </div>
        </div>

        {/* Right form panel */}
        <div className='login-form-panel'>
          <div className='login-card'>

            <div className='login-card-header'>
              <h2>Welcome back</h2>
              <p>Enter your details to sign in</p>
            </div>

            <form onSubmit={handleSubmit} className='login-form'>

              <div className='input-group'>
                <FiMail className='input-icon' />
                <label htmlFor="loginEmail" className='sr-only'>Email</label>
                <input
                  type="email"
                  id="loginEmail"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder='Enter your email'
                  required
                />
              </div>

              <div className='input-group'>
                <FiLock className='input-icon' />
                <label htmlFor="loginPassword" className='sr-only'>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="loginPassword"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder='Enter your password'
                  required
                />
                <button
                  type="button"
                  className='toggle-password'
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <button
                type="button"
                className='forgot-link'
                onClick={() => { router.push('/forgot-password') }}
              >
                Forgot password?
              </button>

              <button type="submit" className="login-submit-btn">
                Login
              </button>

              <div className='login-divider'>
                <span>New here?</span>
              </div>

              <button
                type="button"
                className='signup-btn'
                onClick={() => { router.push('/register') }}
              >
                Create an account
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login