'use client'

import React from 'react'
import "@/styles/createCategoty.css"

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <div className='category-form'>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter new Category'
            value={value} onChange={(e) => setValue(e.target.value)} />
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}

export default CategoryForm
