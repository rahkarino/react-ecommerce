import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import {
  productListReducer,
  productDetailReducer,
  categoryListReducer,
} from "./Product/product.reducer";
import { basketReducer } from "./Basket/basket.reducer";

export default combineReducers({
  user: userReducer,
  productsList: productListReducer,
  productDetail: productDetailReducer,
  categoriesList: categoryListReducer,
  basket: basketReducer,
});
