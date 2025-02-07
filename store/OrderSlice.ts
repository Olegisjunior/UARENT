import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  pickUpLocation: string | null;
  pickUpDate: string | null;
  pickUpTime: string | null;
  dropOffLocation: string | null;
  dropOffDate: string | null;
  dropOffTime: string | null;
}

const initialState: OrderState = {
  pickUpLocation: null,
  pickUpDate: null,
  pickUpTime: null,
  dropOffLocation: null,
  dropOffDate: null,
  dropOffTime: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderDetails(state, action: PayloadAction<Partial<OrderState>>) {
      return { ...state, ...action.payload };
    },
    resetOrder() {
      return initialState;
    },
  },
});

export const { setOrderDetails, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
