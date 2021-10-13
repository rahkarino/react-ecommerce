import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

export const middlewares = [thunk, logger];

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  basket: { cartItems: cartItemsFromLocalStorage },
};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);
export default store;
