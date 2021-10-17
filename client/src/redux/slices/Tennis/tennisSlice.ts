import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formattedStageType, tennisMatchesByDateFailure } from "./tennisTypes";

type tennisSliceType = {
  error: string | null;
  loading: boolean;
  matchesByDate: formattedStageType[] | null;
};

const tennisSlice = createSlice({
  name: "Tennis",
  initialState: {
    loading: false,
    matchesByDate: null,
    error: null,
  } as tennisSliceType,
  reducers: {
    getTennisMatchesByDateLoading(state) {
      state.loading = true;
      state.error = null;
    },
    getTennisMatchesByDateSuccess(state, action: PayloadAction<formattedStageType[]>) {
      state.matchesByDate = action.payload;
      state.error = null;
      state.loading = false;
    },
    getTennisMatchesByDateFailure(
      state,
      action: PayloadAction<tennisMatchesByDateFailure>
    ) {
      state.error = action.payload.error;
      state.loading = false;
    },

    resetTennisMatchesByDate(state) {
      state.error = null;
      state.loading = false;
      state.matchesByDate = null;
    },
  },
});

const { actions, reducer } = tennisSlice;

export { actions };

export default reducer;
