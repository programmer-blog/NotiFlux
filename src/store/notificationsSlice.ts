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
  notificationsList: [
    {
      text: "Notofication First",
      id: "abc123",
      read: false,
    },
    {
      text: "Notofication Second",
      id: "abc456",
      read: true,
    },
    {
      text: "Notofication Third",
      id: "abc789",
      read: false,
    },
  ],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      state.notificationsList.forEach((item) => {
        const targetId = action.payload;
        if (item.id === targetId) {
          item.read = true;
        }
      });
    },
  },
});

export const { markAsRead } = notificationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNotifications = (state: RootState) =>
  state.notifications.notificationsList;

export const selectUnreadNotificationsCount = (state: RootState) => {
  const unReadItems = state.notifications.notificationsList.filter((item) => {
    return !item.read;
  });

  return unReadItems.length;
};
export default notificationsSlice.reducer;
