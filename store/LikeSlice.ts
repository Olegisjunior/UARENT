import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface car {
  id: number;
  name: string;
  imageUrl: string;
}
export interface LikeState {
  cars: car[];
}

const likeSlice = createSlice({
  name: "like",

  initialState: {
    cars: [],
  } as LikeState,
  reducers: {
    addCar(state: LikeState, action: PayloadAction<car>) {
      state.cars.push(action.payload);
    },
    removeCar(state: LikeState, action: PayloadAction<number>) {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },
  },
});

export const { addCar, removeCar } = likeSlice.actions;

export default likeSlice.reducer;
