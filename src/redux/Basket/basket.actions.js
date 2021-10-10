import basketTypes from "../Basket/basket.types";
import firebase from "firebase/compat/app";

const db = firebase.firestore();

export const addToCart =
  ({ id, name, price, image }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: basketTypes.ADD_TO_CART_REQUEST,
      });
      dispatch({
        type: basketTypes.ADD_TO_CART_SUCCESS,
        payload: {
          id,
          name,
          image,
          price,
        },
      });
      console.log("ii: ", getState().basket.cartItems);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().basket.cartItems)
      );
    } catch (error) {
      dispatch({
        type: basketTypes.ADD_TO_CART_ERROR,
      });
    }
  };

export const removeFromCart = (id) => async (dispatch) => {
  try {
    dispatch({
      type: basketTypes.REMOVE_FROM_CART_REQUEST,
    });
  } catch (error) {
    dispatch({
      type: basketTypes.REMOVE_FROM_CART_ERROR,
    });
  }
};
