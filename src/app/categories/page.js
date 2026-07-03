'use client'

import React from 'react'
import useCategory from '@/hooks/useCategory'
import Link from 'next/link'
import "@/styles/mainCategories.css"

const Categories = () => {
  const categories = useCategory()
  return (
    <div className='main-categories'>
      <h1>ALL CATEGORIES</h1>
      <div className='roww'>
        {categories.map((c) => (
          <div className='btn-categories' key={c._id}>
            <Link className='btn-cat' href={`/category/${c.slug}`}>
              {c.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
