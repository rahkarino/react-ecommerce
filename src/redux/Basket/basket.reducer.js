import basketTypes from "./basket.types";

const initialState = {
  cartItems: [],
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketTypes.ADD_TO_CART_REQUEST:
      return {
        cartItems: [],
      };
    case basketTypes.ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === existingItem.id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case basketTypes.ADD_TO_CART_ERROR:
      return state;

    default:
      return state;
  }
};
