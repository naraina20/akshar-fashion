"use client"
// src/context/ProductContext.js
import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  return (
    <ProductContext.Provider value={{ products, setProducts,pagination,setPagination }}>
      {children}
    </ProductContext.Provider>
  );
};
