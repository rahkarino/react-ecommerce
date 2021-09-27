import userTypes from "./user.types";
import { auth, handleUserProfile, googleProvider } from "../../firebase/utils";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    } catch (err) {}
  };

export const signUpUser =
  ({ displayName, email, password, confirmPassword }) =>
  async (dispatch) => {
    try {
      if (password !== confirmPassword) {
        const errors = ["Passwords don't match"];
        dispatch({
          type: userTypes.SIGN_UP_ERROR,
          payload: errors,
        });
      } else {
        dispatch({
          type: userTypes.SIGN_UP_ERROR,
          payload: [],
        });
        try {
          const { user } = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
          await handleUserProfile(user, { displayName });
          dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true,
          });
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {}
  };

export const resetPassword = (email) => async (dispatch) => {
  const config = {
    url: "http://localhost:3000/login",
  };
  try {
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true,
        });
        // history.push("/login");
        // setLoading(false);
      })
      .catch(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: false,
        });
        // setError("Email Not Found !");
        // setLoading(false);
      });
  } catch (err) {
    console.log(err);
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth
      .signInWithPopup(googleProvider)
      .then(() => {
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true,
        });
      })
      .catch((error) => {});
  } catch (err) {}
};

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});
