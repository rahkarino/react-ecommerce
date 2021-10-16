import basketTypes from "./basket.types";

const initialState = {
  cartItems: [],
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketTypes.ADD_TO_CART_REQUEST:
      return {
        ...state,
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
      return { ...state };

    case basketTypes.REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
      };

    case basketTypes.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.payload),
      };

    case basketTypes.REMOVE_FROM_CART_ERROR:
      return { ...state };

    case basketTypes.INCREMENT_ITEM_REQUEST:
      return { ...state };

    case basketTypes.INCREMENT_ITEM_SUCCESS:
      let selected = state.cartItems.find((i) => i.id === action.payload);
      selected.count = selected.count + 1;
      return {
        ...state,
        cartItems: state.cartItems,
      };

    case basketTypes.INCREMENT_ITEM_ERROR:
      return { ...state };

    case basketTypes.DECREMENT_ITEM_REQUEST:
      return { ...state };

    case basketTypes.DECREMENT_ITEM_SUCCESS:
      let selected1 = state.cartItems.find((i) => i.id === action.payload);
      if (selected1.count > 1) selected1.count = selected1.count - 1;
      return {
        ...state,
        cartItems: state.cartItems,
      };

    case basketTypes.DECREMENT_ITEM_ERROR:
      return { ...state };

    default:
      return state;
  }
};
