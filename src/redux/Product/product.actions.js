import productTypes from "./product.types";
import basketTypes from "../Basket/basket.types";
import firebase from "firebase/compat/app";

const db = firebase.firestore();

export const getProductsList = (category) => async (dispatch) => {
  try {
    dispatch({
      type: productTypes.PRODUCT_LIST_REQUEST,
    });
    if (category === "all") {
      await db.collection("products").onSnapshot((snapshot) => {
        const productsData = [];
        snapshot.forEach((doc) =>
          productsData.push({ ...doc.data(), id: doc.id })
        );
        dispatch({
          type: productTypes.PRODUCT_LIST_SUCCESS,
          payload: productsData,
        });
      });
    } else
      await db
        .collection("categories")
        .doc(category)
        .collection("products")
        .onSnapshot((snapshot) => {
          const productsData = [];
          snapshot.forEach((doc) =>
            productsData.push({ ...doc.data(), id: doc.id })
          );
          dispatch({
            type: productTypes.PRODUCT_LIST_SUCCESS,
            payload: productsData,
          });
        });
  } catch (error) {
    dispatch({
      type: productTypes.PRODUCT_LIST_ERROR,
    });
  }
};

export const getProductsDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: productTypes.PRODUCT_DETAIL_REQUEST,
    });

    await db
      .collection("products")
      .doc(id)
      .get()
      .then((snapshot) => () => {
        console.log("snap: ", snapshot.data());
        dispatch({
          type: productTypes.PRODUCT_DETAIL_SUCCESS,
          payload: snapshot.data(),
        });
      })
      .catch(() => {
        dispatch({
          type: productTypes.PRODUCT_LIST_ERROR,
        });
      });
  } catch (error) {
    dispatch({
      type: productTypes.PRODUCT_LIST_ERROR,
    });
  }
};

export const getCategoriesList = async (dispatch) => {
  try {
    dispatch({
      type: productTypes.CATEGORY_LIST_REQUEST,
    });

    await db.collection("categories").onSnapshot((snapshot) => {
      const categoriesData = [];
      snapshot.forEach((doc) =>
        categoriesData.push({ ...doc.data(), id: doc.id })
      );

      dispatch({
        type: productTypes.CATEGORY_LIST_SUCCESS,
        payload: categoriesData,
      });
    });
  } catch (error) {
    dispatch({
      type: productTypes.CATEGORY_LIST_ERROR,
    });
  }
};

export const addToCart = (id) => async (dispatch) => {
  try {
    dispatch({
      type: basketTypes.ADD_TO_CART_REQUEST,
    });
    
  } catch (error) {
    dispatch({
      type: basketTypes.ADD_TO_CART_ERROR,
    });
  }
};
