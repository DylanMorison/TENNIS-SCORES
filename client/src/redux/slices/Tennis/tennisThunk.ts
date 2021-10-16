import { actions } from "./tennisSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { formattedStageType } from "./tennisTypes";

const {
  getTennisMatchesByDateSuccess,
  getTennisMatchesByDateFailure,
  getTennisMatchesByDateLoading,
} = actions;

const getTennisMatchesByDate = (Date: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(getTennisMatchesByDateLoading());
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("authorization"),
      },
    } as AxiosRequestConfig;
    const res = await axios.get<formattedStageType[]>(
      `/api/tennis/matches-by-date/${Date}`,
      config
    );

    dispatch(getTennisMatchesByDateSuccess(res.data));
  } catch (err: any) {
    dispatch(getTennisMatchesByDateFailure({ error: err.message }));
  }
};

export { getTennisMatchesByDate };
