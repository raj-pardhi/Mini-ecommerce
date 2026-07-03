'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3)
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000)

    count === 0 && router.push(`/${path}`);

    return () => clearInterval(interval);
  }, [count, router, pathname, path])

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className='Text-center'>Redirecting to you in {count} second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  )
}

export default Spinner