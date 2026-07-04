'use client'

import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="e.g. Electronics, Fashion, Books"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Save
      </button>
    </form>
  )
}

export default CategoryForm