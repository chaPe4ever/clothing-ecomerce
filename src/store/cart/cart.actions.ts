import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const items = cartItems || [];
  if (items.find((cartItem) => cartItem.id === productToAdd.id)) {
    return items.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...items, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  const items = cartItems || [];
  const existingCartItem = items.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return items.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  return items.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
) => {
  const items = cartItems || [];
  return items.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export type SetCartIsOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartIsOpen = withMatcher((bool: boolean): SetCartIsOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
});

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = withMatcher(
  (cartItems: CartItem[], product: CategoryItem) => {
    const addedItem = addCartItem(cartItems, product);
    return setCartItems(addedItem);
  }
);

export const removeItemFromCart = withMatcher(
  (cartItems: CartItem[], product: CategoryItem) => {
    const removedCartItem = removeCartItem(cartItems, product);
    return setCartItems(removedCartItem);
  }
);

export const clearItemFromCart = withMatcher(
  (cartItems: CartItem[], product: CategoryItem) => {
    const clearedItem = clearCartItem(cartItems, product);
    return setCartItems(clearedItem);
  }
);
