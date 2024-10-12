import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { ExitIcon, PinLeftIcon, PinRightIcon } from "@radix-ui/react-icons";
import { useAppStore } from "../lib/zustand";
import siteLogo from "../../public/flower.png";

function Header() {
  const setAdmin = useAppStore((state) => state.setAdmin);
  const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  const logOut = () => {
    const checker = confirm(
      "Are you sure you really want to log out of the system?"
    );
    checker && setAdmin(null);
  };

  function handleSidebar() {
    setSidebarOpen();
  }

  return (
    <header className="p-5 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <NavLink
            className="font-medium text-xl flex gap-5 items-center"
            to="/"
          >
            <img src={siteLogo} alt="" width={30} height={30} />
            {sidebarOpen && "Flower app"}
          </NavLink>

          <Button onClick={handleSidebar} variant="outline">
            {sidebarOpen ? <PinLeftIcon /> : <PinRightIcon />}
          </Button>
        </div>

        <Button variant="outline" onClick={logOut}>
          Log Out
          <ExitIcon className="ml-2" />
        </Button>
      </div>
    </header>
  );
}

export default Header;
