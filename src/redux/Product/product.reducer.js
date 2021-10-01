import productTypes from "./product.types";

const initialState1 = {
  loading: false,
  products: [],
};

export const productListReducer = (state = initialState1, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case productTypes.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case productTypes.PRODUCT_LIST_ERROR:
      return {
        loading: false,
        products: [],
      };
    default:
      return state;
  }
};

const initialState2 = {
  loading: false,
  product: {},
};

export const productDetailReducer = (state = initialState2, action) => {
  switch (action.type) {
    case productTypes.PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case productTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case productTypes.PRODUCT_DETAIL_ERROR:
      return {
        loading: false,
        product: {},
      };
    default:
      return state;
  }
};

const initialState3 = {
  loading: false,
  categories: [],
};

export const categoryListReducer = (state = initialState3, action) => {
  switch (action.type) {
    case productTypes.CATEGORY_LIST_REQUEST:
      return {
        loading: true,
        categories: [],
      };
    case productTypes.CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case productTypes.CATEGORY_LIST_ERROR:
      return {
        loading: false,
        categories: [],
      };
    default:
      return state;
  }
};
