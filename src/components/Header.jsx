import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useAppStore } from "../lib/zustand";

function Header() {
  const setAdmin = useAppStore((state) => state.setAdmin);
  const logOut = () => {
    const checker = confirm(
      "Are you sure you really want to log out of the system?"
    );
    checker && setAdmin(null);
  };

  return (
    <header className="py-5 shadow-sm">
      <div className="base-container flex items-center justify-between">
        <NavLink className="font-medium text-xl" to="/">
          Flower app
        </NavLink>

        <Button onClick={logOut}>
          Log Out
          <ExitIcon className="ml-2" />
        </Button>
      </div>
    </header>
  );
}

export default Header;
