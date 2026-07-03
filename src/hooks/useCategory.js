'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategoris] = useState([])

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategoris(data?.category);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  return categories;
}
