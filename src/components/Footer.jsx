import { NavLink } from "react-router-dom";
import { buttonVariants } from "./ui/button";

function Footer() {
  return (
    <footer className="border-t py-5">
      <div className="flex items-center justify-center gap-2">
        <span className="font-medium">Powered by </span>
        <NavLink
          className={`${buttonVariants({ variant: "link" })} !p-0 font-medium`}
          to="http://json-api.uz"
          target="_blank"
        >
          json-api.uz
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;
