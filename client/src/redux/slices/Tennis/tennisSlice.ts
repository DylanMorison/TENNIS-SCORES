import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formattedStagesType, tennisMatchesByDateFailure } from "./tennisTypes";

type tennisSliceType = {
  error: string | null;
  loading: boolean;
  stages: formattedStagesType | null;
};

const tennisSlice = createSlice({
  name: "Tennis",
  initialState: {
    loading: false,
    stages: null,
    error: null,
  } as tennisSliceType,
  reducers: {
    getTennisMatchesByDateSuccess(state, action: PayloadAction<formattedStagesType>) {
      state.stages = action.payload;
    },
    getTennisMatchesByDateFailure(
      state,
      action: PayloadAction<tennisMatchesByDateFailure>
    ) {
      state.error = action.payload.error;
    },
  },
});

const { actions, reducer } = tennisSlice;

export { actions };

export default reducer;
