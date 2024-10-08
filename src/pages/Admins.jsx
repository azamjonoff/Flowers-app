import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { getAdmins, refreshToken } from "../request";
import { useAppStore } from "../lib/zustand";
import { toast } from "sonner";
import {
  LockOpen2Icon,
  Pencil1Icon,
  TrashIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "../components/ui/button";

function Admins() {
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const [admins, setAdmins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAdmins(admin?.access_token)
      .then(({ data }) => {
        setAdmins(data);
      })
      .catch(({ message }) => {
        if (message === "403") {
          refreshToken(admin?.refresh_token)
            .then(({ access_token }) => {
              setAdmin(...admin, access_token);
            })
            .catch(() => {
              toast.info("Please logIn again");
              setAdmin(null);
            });
        }
      })
      .finally(() => setLoading(false));
  }, [admin]);

  console.log(admins);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center">
          <h3 className="h3">Loading...</h3>{" "}
          <UpdateIcon className="animate-spin ml-3 " />
        </div>
      )}
      <ul className="grid grid-cols-3 gap-5">
        {!loading &&
          admins?.map(({ id, username, password }) => {
            return (
              <li key={id}>
                <Card>
                  <CardHeader className="flex-row gap-3 items-center">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback className="uppercase">
                        {username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="capitalize">{username}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    Password:{" "}
                    <span className="font-bold text-2xl leading-none">
                      {password.split("").map(() => ".")}
                    </span>
                  </CardContent>
                  <CardFooter>
                    <div className="flex !items-center gap-5">
                      <TooltipProvider delayDuration="0">
                        <Tooltip>
                          <TooltipTrigger>
                            <span
                              className={buttonVariants({
                                variant: "secondary",
                                size: "icon",
                              })}
                            >
                              <Pencil1Icon />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit this user</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration="0">
                        <Tooltip>
                          <TooltipTrigger>
                            <span
                              className={buttonVariants({
                                variant: "destructive",
                                size: "icon",
                              })}
                            >
                              <TrashIcon />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete this user</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration="0">
                        <Tooltip>
                          <TooltipTrigger>
                            <span
                              className={buttonVariants({
                                variant: "outline",
                                size: "icon",
                              })}
                            >
                              <LockOpen2Icon />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Lock this user</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardFooter>
                </Card>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Admins;
