'use client'

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth"
import axios from "axios"
import Spinner from "@/components/Spinner"

export default function PrivateRoute({ children }) {
  const [ok, setOk] = useState(false)
  const [auth, setauth] = useAuth()

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get('/api/v1/auth/user-auth')
      if (res.data.ok) {
        setOk(true)
      } else {
        setOk(false)
      }
    }
    if (auth?.token) authCheck();
  }, [auth?.token])

  return ok ? children : <Spinner />;
}
