import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LockClosedIcon,
  LockOpen2Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { toast } from "sonner";
import EditAdmin from "../components/EditAdmin";
import { buttonVariants } from "../components/ui/button";
import { findObj } from "../lib/my-utils";
import { useAppStore } from "../lib/zustand";
import { getAdmins, refreshToken } from "../request";

function Admins() {
  const ref = useRef();
  const { admin, setAdmin, setAdminEditSheet } = useAppStore();
  const [admins, setAdmins] = useState(null);
  const [editedAdmin, setEditedAdmin] = useState(null);
  const { pathname } = useLocation();

  function handleEdit(id) {
    setAdminEditSheet();
    const result = findObj(admins, id);
    setEditedAdmin(result);
  }

  useEffect(() => {
    ref?.current.continuousStart();
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
      .finally(() => {
        ref?.current.complete();
      });
  }, [admin]);

  if (admin) {
    if (localStorage.getItem("lastPage") !== pathname) {
      localStorage.setItem("lastPage", pathname);
    }
    return (
      <>
        <LoadingBar color="#18181b" ref={ref} />
        <div>
          <ul className="grid grid-cols-3 gap-5">
            {admins?.map(({ id, username, password, isActive, type }) => {
              return (
                type === "user" && (
                  <li key={id}>
                    <Card>
                      <CardHeader className="flex-row gap-3 items-center">
                        <Avatar>
                          <AvatarImage src="" alt={username} />
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
                              <TooltipTrigger onClick={() => handleEdit(id)}>
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
                                  {isActive ? (
                                    <LockOpen2Icon />
                                  ) : (
                                    <LockClosedIcon />
                                  )}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {isActive
                                    ? "Lock this user"
                                    : "Unlock this user"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardFooter>
                    </Card>
                  </li>
                )
              );
            })}
          </ul>
        </div>

        {editedAdmin && (
          <EditAdmin editedAdmin={editedAdmin} setAdmins={setAdmins} />
        )}
      </>
    );
  } else return <Navigate to="/login" />;
}

export default Admins;
