import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
// import { Purchase } from '../interface/Purchase';
// import { Product } from '../interface/Product';
import { PurchaseType } from '../interface/Purchase';


export type CartContextType = {
  cart: PurchaseType[];
  resfreshData: boolean;
  setRefreshData: Dispatch<SetStateAction<boolean>>;
  setCart: Dispatch<SetStateAction<PurchaseType[]>>
};


const defaultContextValue: CartContextType = {
  cart: [],
  resfreshData: false,
  setRefreshData: () => { },
  setCart: () => { }
};
export const CartContext = createContext<CartContextType>(defaultContextValue);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [resfreshData, setRefreshData] = useState<boolean>(defaultContextValue.resfreshData)
  const [cart, setCart] = useState<PurchaseType[]>(defaultContextValue.cart);

  return (<CartContext.Provider value={{ cart, resfreshData, setRefreshData, setCart }}>
    {children}
  </CartContext.Provider>);
};
