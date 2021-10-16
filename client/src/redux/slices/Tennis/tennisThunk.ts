import { actions } from "./tennisSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { formattedStagesType } from "./tennisTypes";

const { getTennisMatchesByDateSuccess, getTennisMatchesByDateFailure } = actions;

const getTennisMatchesByDate = (Date: string) => async (dispatch: Dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("authorization"),
      },
    } as AxiosRequestConfig;
    const res = await axios.get<formattedStagesType>(
      `/api/tennis/matches-by-date/${Date}`,
      config
    );
      
    dispatch(getTennisMatchesByDateSuccess(res.data));
  } catch (err: any) {
    let error;
    if (!!err.response.data.message) {
      error = err.response.data.message;
    } else {
      error = err.message;
    }
    dispatch(getTennisMatchesByDateFailure({ error }));
  }
};

export { getTennisMatchesByDate };
