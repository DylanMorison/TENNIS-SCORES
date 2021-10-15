import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { checkLocalStorage } from "../../utils/index";
import { signinSuccessType, signinFailureType } from "./userTypes";

type userSliceType = {
  isAuthenticated: boolean;
  email: string | null;
  error: string | null;
  loading: boolean;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: checkLocalStorage("authorization"),
    email: checkLocalStorage("email") ? localStorage.getItem("email") : null,
    error: null,
    loading: false,
  } as userSliceType,
  reducers: {
    signinUserLoading(state) {
      state.loading = true;
    },
    signinUserSuccess(state, action: PayloadAction<signinSuccessType>) {
      const { email, token } = action.payload;

      state.email = email;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
      localStorage.setItem("authorization", token);
    },

    signinUserFailure(state, action: PayloadAction<signinFailureType>) {
      const { error } = action.payload;

      if (checkLocalStorage("authorization")) {
        localStorage.removeItem("authorization");
      }

      state.isAuthenticated = false;
      state.email = null;
      state.loading = false;
      state.error = error;
    },
  },
});

const { actions, reducer } = userSlice;

export { actions };

export default reducer;
