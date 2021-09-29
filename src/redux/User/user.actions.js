import userTypes from "./user.types";
import { auth, handleUserProfile, googleProvider } from "../../firebase/utils";
import { toast } from "react-toastify";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          toast.success("Successful Login");
          dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true,
          });
        })
        .catch(() => {
          dispatch({
            type: userTypes.SIGN_IN_ERROR,
            payload: ["User or Pass in incorrect!"],
          });
        });
    } catch (err) {
      toast.error("Error");
    }
  };

export const signUpUser =
  ({ displayName, email, password, confirmPassword }) =>
  async (dispatch) => {
    try {
      if (
        displayName === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        const errors = ["All fields required"];
        dispatch({
          type: userTypes.SIGN_UP_ERROR,
          payload: errors,
        });
      } else if (password.length < 6) {
        const errors = ["Password should contains min 6 characters"];
        dispatch({
          type: userTypes.SIGN_UP_ERROR,
          payload: errors,
        });
      } else if (password !== confirmPassword) {
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
          toast.success("Successful Registration");
        } catch (err) {
          toast.error("Error");
        }
      }
    } catch (err) {
      toast.error("Error");
    }
  };

export const resetPassword = (email) => async (dispatch) => {
  const config = {
    url: "http://localhost:3000/login",
  };
  if (email === "") {
    const errors = ["Email is required"];
    dispatch({
      type: userTypes.RESET_PASSWORD_ERROR,
      payload: errors,
    });
  } else {
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          toast.success("Reset password email sent.");
          dispatch({
            type: userTypes.RESET_PASSWORD_SUCCESS,
            payload: true,
          });
        })
        .catch((err) => {
          dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: ["Email is not correct"],
          });
        });
    } catch (err) {
      console.log(err);
    }
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth
      .signInWithPopup(googleProvider)
      .then(() => {
        toast.success("Successful Login");
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true,
        });
      })
      .catch((error) => {
        toast.error("Error");
      });
  } catch (err) {
    toast.error("Error");
  }
};

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});
