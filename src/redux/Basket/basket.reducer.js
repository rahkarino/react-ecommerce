import basketTypes from "./basket.types";

const initialState = {
  cartItems: [],
};
export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketTypes.ADD_TO_CART_REQUEST:
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existingItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
