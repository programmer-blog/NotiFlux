import type { NotificationItem } from "@/types";
import { Button } from "./ui/button";
import { Circle } from "lucide-react";

const Notifications = () => {
  const notifications: NotificationItem[] = [
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
  ];

  return (
    <div className="max-w-lg mx-auto">
      <ul className="flex flex-col gap-4 my-10">
        {notifications.map((notificationItem) => {
          return (
            <li className="border rounded-md border-white flex px-3 py-2 justify-between items-center">
              <div className="flex flex-col">
                <h3>{notificationItem.text}</h3>
              </div>
              <div>
                <Button
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
