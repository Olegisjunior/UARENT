import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./OrderSlice";
import likeReducer from "./LikeSlice";
// import { loadState, saveState } from "./persist-state";

// const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    order: orderReducer,
    like: likeReducer,
  },

  // preloadedState: { order: preloadedState },
});

// store.subscribe(() => {
//   saveState(store.getState().order);
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
