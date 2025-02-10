import React, { createContext, useContext, useState } from 'react';

const SellerContext = createContext();

export const useSeller = () => useContext(SellerContext);

export const SellerProvider = ({ children }) => {
  const [isSeller, setIsSeller] = useState(() => {
    return localStorage.getItem('userType') === 'seller';
  });

  const checkIsSeller = (email, password) => {
    return email === 'seller@gmail.com' && password === 'sell123';
  };

  const loginAsSeller = (email, password) => {
    if (checkIsSeller(email, password)) {
      setIsSeller(true);
      localStorage.setItem('userType', 'seller');
      return true;
    }
    return false;
  };

  const logoutSeller = () => {
    setIsSeller(false);
    localStorage.removeItem('userType');
  };

  return (
    <SellerContext.Provider value={{ isSeller, loginAsSeller, logoutSeller }}>
      {children}
    </SellerContext.Provider>
  );
}; 