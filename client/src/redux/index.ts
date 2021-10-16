import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/User/userSlice";
import TennisReducer from "./slices/Tennis/tennisSlice";

const store = configureStore({
  reducer: { User: UserReducer, Tennis: TennisReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
