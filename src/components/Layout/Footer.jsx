import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='footer'>
      {/* <h4 className='text-center'>
            All Right Reserved &copy: Raj
        </h4> */}
      <p className='text-center'>
        <Link href="/about">About</Link> |
        <Link href="/contact">Contact</Link> |
        <Link href="/policy">Policy</Link>
      </p>
    </div>
  )
}

export default Footer
