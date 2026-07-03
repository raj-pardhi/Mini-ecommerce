'use client'

import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
  const [auth, setauth] = useState({
    keyword: "",
    results: [],
  })

  return (
    <SearchContext.Provider value={[auth, setauth]}>
      {children}
    </SearchContext.Provider>
  )
}

// custom hook
const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvider }
