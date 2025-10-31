import type { NotificationItem } from "@/types";
import { Button } from "./ui/button";
import { Circle } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { markAsRead, selectNotifications } from "@/store/notificationsSlice";
import { useDispatch } from "react-redux";

const Notifications = () => {
  const notifications: NotificationItem[] = useAppSelector(selectNotifications);
  const dispatch = useDispatch();

  return (
    <div className="max-w-lg mx-auto">
      <ul className="flex flex-col gap-4 my-10">
        {notifications.map((notificationItem) => {
          return (
            <li
              key={notificationItem.id}
              className="border rounded-md border-white flex px-3 py-2 justify-between items-center"
            >
              <div className="flex flex-col">
                <h3>{notificationItem.text}</h3>
              </div>
              <div>
                <Button
                  onClick={() => {
                    dispatch(markAsRead(notificationItem.id));
                  }}
                  className={`${
                    notificationItem.read ? "invisible" : "visible"
                  } bg-white text-black hover:bg-black hover:text-white cursor-pointer`}
                  variant="outline"
                  size="icon"
                >
                  <Circle className="h-4 w-6" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;
