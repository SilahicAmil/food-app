import CartContext from "./Cart-Context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// using reducer since the add and remove item state is more compliacted

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // index is item.id that equals the action.item.id
    const exisitngCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // index the state.items on the exisitingCartItemIndex
    const existingCartItem = state.items[exisitngCartItemIndex];
    let updatedItems;

    // if the cart item exists
    if (existingCartItem) {
      // update the updatedItem by spreading the cart items
      // then setting the amount to cart item amount plus the action item amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      //   then spread the state.items into updatedItems
      //   which is the updated items so far
      updatedItems = [...state.items];
      //   then set the updatedItems with the cart item index to the updated item
      updatedItems[exisitngCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    // Now return the updated items and totalAmount
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  //   below if statement is the reverse of the above essentially
  if (action.type === "REMOVE_ITEM") {
    const exisitngCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[exisitngCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };

      updatedItems = [...state.items];
      updatedItems[exisitngCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
