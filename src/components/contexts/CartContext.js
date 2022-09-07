import { createContext, useState } from "react";

const CartContext = (props) => {
  createContext({
    openCart: () => {},
    closeCart: () => {},
  });
};

export const CartContextProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return <CartContext.Provider>{props.children}</CartContext.Provider>;
};

export default CartContext;
