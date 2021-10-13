import productTypes from "./product.types";
import firebase from "firebase/compat/app";

const db = firebase.firestore();

export const getProductsListByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: productTypes.PRODUCT_LIST_REQUEST,
    });

    await db
      .collection("products")
      .where("category", "==", category)
      .get()
      .then((querySnapshot) => {
        const productsList = [];
        querySnapshot.forEach((doc) => {
          productsList.push({ ...doc.data(), id: doc.id });
        });
        dispatch({
          type: productTypes.PRODUCT_LIST_SUCCESS,
          payload: productsList,
        });
      })
      .catch((error) => {
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

export const getProductsListAll = async (dispatch) => {
  try {
    dispatch({
      type: productTypes.PRODUCT_LIST_REQUEST,
    });

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
      .where("id", "==", id)
      .get()
      .then((snapshot) => () => {
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
