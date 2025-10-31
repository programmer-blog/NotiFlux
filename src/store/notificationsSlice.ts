import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { NotificationItem } from "@/types";

// Define a type for the slice state
interface NotificationsState {
  notificationsList: NotificationItem[];
}

// Define the initial state using that type
const initialState: NotificationsState = {
  notificationsList: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// export const { increment, decrement, incrementByAmount } =
//   notificatiosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNotifications = (state: RootState) =>
  state.notifications.notificationsList;

export default notificationsSlice.reducer;
