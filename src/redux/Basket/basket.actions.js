import basketTypes from "../Basket/basket.types";
import firebase from "firebase/compat/app";

const db = firebase.firestore();

export const addToCart =
  ({ id, name, price, image, count = 1 }) =>
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
          count,
        },
      });
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

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: basketTypes.REMOVE_FROM_CART_REQUEST,
    });
    dispatch({
      type: basketTypes.REMOVE_FROM_CART_SUCCESS,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().basket.cartItems)
    );
  } catch (error) {
    dispatch({
      type: basketTypes.REMOVE_FROM_CART_ERROR,
    });
  }
};

export const incrementCartItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: basketTypes.INCREMENT_ITEM_REQUEST,
    });
    dispatch({
      type: basketTypes.INCREMENT_ITEM_SUCCESS,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().basket.cartItems)
    );
  } catch (error) {
    dispatch({
      type: basketTypes.INCREMENT_ITEM_ERROR,
    });
  }
};

export const decrementCartItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: basketTypes.DECREMENT_ITEM_REQUEST,
    });
    dispatch({
      type: basketTypes.DECREMENT_ITEM_SUCCESS,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().basket.cartItems)
    );
  } catch (error) {
    dispatch({
      type: basketTypes.DECREMENT_ITEM_ERROR,
    });
  }
};
