import { actions } from "./userSlice";
import { signinSuccessType } from "./userTypes";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

const { signinUserLoading, signinUserSuccess, signinUserFailure } = actions;

const signinUser = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(signinUserLoading());
    const res = await axios.post<signinSuccessType>("/api/users/signin", {
      email,
      password,
    });

    dispatch(signinUserSuccess({ email: res.data.email, token: res.data.token }));
  } catch (err: any) {
    let error;
    if (!!err.response.data.message) {
      error = err.response.data.message;
    } else {
      error = err.message;
    }
    dispatch(signinUserFailure({ error }));
  }
};

const signupUser = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(signinUserLoading());
    const res = await axios.post<signinSuccessType>("/api/users/signup", {
      email,
      password,
    });

    dispatch(signinUserSuccess({ email: res.data.email, token: res.data.token }));
  } catch (err: any) {
    dispatch(signinUserFailure({ error: err.message }));
  }
};

export { signinUser, signupUser };
