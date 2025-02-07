import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./OrderSlice";
import likeReducer from "./LikeSlice";

const isBrowser = typeof window !== "undefined"; // Перевірка, чи це браузер

const saveState = (state: RootState) => {
  if (isBrowser) {
    localStorage.setItem("reduxState", JSON.stringify(state));
  }
};

const loadState = () => {
  if (isBrowser) {
    const storedState = localStorage.getItem("reduxState");
    return storedState ? JSON.parse(storedState) : undefined;
  }
  return undefined;
};

export const store = configureStore({
  reducer: {
    order: orderReducer,
    like: likeReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import orderReducer from "./OrderSlice";
// import likeReducer from "./LikeSlice";

// export const store = configureStore({
//   reducer: {
//     order: orderReducer,
//     like: likeReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
