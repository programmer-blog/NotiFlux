import NotificationsButton from "./NotificationsButton";

const Header = () => {
  return (
    <header className="px-2 py-2 flex h-12 justify-between  bg-slate-900 items-center">
      <span>Redux Notifications</span>
      <NotificationsButton />
    </header>
  );
};

export default Header;
