import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const NotificationsButton = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="relative bg-black text-white hover:bg-white hover:text-black cursor-pointer"
    >
      <Bell className="h-4 w-6" />
      <span className="absolute top-0 right-0 text-xs">20</span>
    </Button>
  );
};

export default NotificationsButton;
