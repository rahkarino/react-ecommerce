import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import {
  productListReducer,
  productDetailReducer,
} from "./Product/product.reducer";

export default combineReducers({
  user: userReducer,
  productsList: productListReducer,
  productDetail: productDetailReducer,
});
