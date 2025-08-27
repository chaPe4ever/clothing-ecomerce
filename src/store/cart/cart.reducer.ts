import { AnyAction } from "redux";
import { CartItem } from "./cart.types";
import { setCartItems, setCartIsOpen } from "./cart.actions";

export type CartState = {
  readonly cartItems: CartItem[];
  readonly isCartOpen: boolean;
};

const INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartIsOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
