import productTypes from "./product.types";
import firebase from "firebase/compat/app";

const db = firebase.firestore();

export const getProductsList = (category) => async (dispatch) => {
  try {
    dispatch({
      type: productTypes.PRODUCT_LIST_REQUEST,
    });

    await db
      .collection("categories")
      .doc(category)
      .collection("products")
      // .where("price", ">", "500000")
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
