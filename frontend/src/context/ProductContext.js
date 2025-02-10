import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts(prev => [...prev, {
      ...product,
      _id: Date.now().toString(),
      price: parseFloat(product.price),
      stock_quantity: parseInt(product.stock_quantity)
    }]);
  };

  const removeProduct = (productId) => {
    setProducts(prev => prev.filter(p => p._id !== productId));
  };

  const updateProduct = (productId, updates) => {
    setProducts(prev => prev.map(p => 
      p._id === productId ? { ...p, ...updates } : p
    ));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}; 