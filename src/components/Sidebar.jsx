import { NavLink } from "react-router-dom";
import { panelLinks } from "../lib/my-utils";
import parse from "html-react-parser";
import { buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "../lib/zustand";

function Sidebar() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  return (
    <div
      className={`!h-full border-r px-1 py-5 transition-all ${
        sidebarOpen ? "w-36" : "w-16"
      }`}
    >
      <ul className="flex flex-col gap-2  w-full">
        {panelLinks.map(({ active, icon, path, title }) => {
          return (
            <li key={title} className="w-full">
              {active && (
                <TooltipProvider delayDuration="0">
                  <Tooltip disableHoverableContent={true}>
                    <span className="relative inline-block w-full hover:bg-accent hover:text-accent-foreground rounded-md overflow-hidden">
                      {!sidebarOpen && (
                        <TooltipTrigger className="absolute inset-0 w-full h-full z-10 inline-block"></TooltipTrigger>
                      )}
                      <NavLink
                        className={`${buttonVariants({
                          variant: "ghost",
                        })} w-full !justify-start gap-2 relative`}
                        to={path}
                      >
                        <>{parse(icon)}</>
                        <span
                          className={`transition-transform ${
                            sidebarOpen
                              ? "scale-100 opacity-100 text-ellipsis line-clamp-1 w-24 inline-block"
                              : "-translate-x-full absolute scale-0 opacity-0"
                          }`}
                        >
                          {title}
                        </span>
                      </NavLink>
                    </span>
                    <TooltipContent
                      className={sidebarOpen ? "hidden" : ""}
                      side="right"
                    >
                      <p>{title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
