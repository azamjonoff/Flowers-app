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
  UpdateIcon,
} from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { toast } from "sonner";
import { Button, buttonVariants } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { findObj, getFormData } from "../lib/my-utils";
import { useAppStore } from "../lib/zustand";
import { deleteAdmin, editAdmin, getAdmins, refreshToken } from "../request";

function Admins() {
  const [admins, setAdmins] = useState(null),
    [loading, setLoading] = useState(false),
    [addLoading, setAddLoading] = useState(false),
    [updateLoading, setUpdateLoading] = useState(false),
    [deleteLoading, setDeleteLoading] = useState(false),
    [addingData, setAddingData] = useState(null),
    [updatingData, setUpdatingData] = useState(null),
    [deletingData, setDeletingData] = useState(null),
    ref = useRef(),
    { admin, setActiveSheet, setAdmin } = useAppStore(),
    { pathname } = useLocation();

  function handleEdit(id) {
    const whichAdmin = findObj(admins, id);

    function handleSubmit(e) {
      const result = getFormData(e.target);
      setUpdatingData({ ...result, id });
    }
    setActiveSheet(
      {
        title: "Edit new admin",
        description: "You can edit admin by entering admin information",
        children: (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-2">
              <Label htmlFor="username">Username*</Label>
              <Input
                defaultValue={whichAdmin.username}
                id="username"
                name="username"
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password*</Label>
              <Input
                defaultValue={whichAdmin.password}
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
              />
            </div>
            <div className="flex justify-end gap-5 mt-4">
              <Button
                disabled={updateLoading}
                type="button"
                variant="outline"
                onClick={() => setActiveSheet(null, "bottom")}
              >
                Cancel
              </Button>
              <Button disabled={updateLoading} type="submit">
                {updateLoading ? (
                  <UpdateIcon className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        ),
      },
      "bottom"
    );
  }

  function handleAddAdmin() {
    function handleSubmit(e) {
      const result = getFormData(e.target);
      setAddingData(result);
    }
    setActiveSheet(
      {
        title: "Add new admin",
        description:
          "You can add a new admin by entering new admin information",
        children: (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-2">
              <Label htmlFor="username">Username*</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password*</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
            <div className="flex justify-end gap-5 mt-4">
              <Button
                disabled={addLoading}
                type="button"
                variant="outline"
                onClick={() => setActiveSheet(null, "top")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={addLoading}>
                {addLoading ? (
                  <UpdateIcon className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        ),
      },
      "top"
    );
  }

  function handleDelete(id) {
    const confirmation = confirm("Really you want to this admin delete?");
    if (confirmation) setDeletingData(id);
  }

  /* get admins */
  useEffect(() => {
    setLoading(true);
    ref?.current.continuousStart();
    getAdmins()
      .then(({ data }) => {
        setAdmins(data);
      })
      .catch(({ message }) => {
        if (message === "403") {
          refreshToken()
            .then(({ access_token }) => {
              setAdmin({ ...admin, access_token });
            })
            .catch(({ message }) => {
              setAdmin(null);
              toast.info(message);
            });
        } else toast.error(message);
      })
      .finally(() => {
        setLoading(false);
        ref?.current.complete();
      });
  }, [admin]);

  // add admin
  useEffect(() => {
    if (addingData) {
      setAddLoading(true);
      addAdmin(addingData)
        .then((message) => {
          toast.success(message);
          setAddingData(null);
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken()
              .then(({ access_token }) => {
                setAdmin({ ...admin, access_token });
              })
              .catch(({ message }) => {
                setAdmin(null);
                toast.info(message);
              });
          } else toast.error(message);
        })
        .finally(() => {
          setAddLoading(false);
        });
    }
  }, [addingData, admin]);

  // update data
  useEffect(() => {
    if (updatingData) {
      setUpdateLoading(true);
      editAdmin(updatingData)
        .then((data) => {
          const index = admins.find(
            (admin, index) => admin.id === updatingData.id && index
          );
          setAdmins((prev) => {
            prev[index] = data;
            return prev;
          });
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken()
              .then(({ access_token }) => {
                setAdmin({ ...admin, access_token });
              })
              .catch(({ message }) => {
                toast.info(message);
                setAdmin(null);
              });
          } else toast.error(message);
        })
        .finally(() => {
          setUpdatingData(null);
          setUpdateLoading(false);
        });
    }
  }, [updatingData, admin]);

  // delete admin
  useEffect(() => {
    if (deletingData) {
      setDeleteLoading(true);
      deleteAdmin(deletingData)
        .then((message) => {
          setDeletingData(null);
          toast.success(message);
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken()
              .then(({ access_token }) => {
                setAdmin({ ...admin, access_token });
              })
              .catch(({ message }) => {
                toast.info(message);
                setAdmin(null);
              });
          } else toast.error(message);
        })
        .finally(() => {
          setDeleteLoading(false);
        });
    }
  }, [deletingData, admin]);

  if (admin) {
    if (localStorage.getItem("lastPage") !== pathname) {
      localStorage.setItem("lastPage", pathname);
    }
    return (
      <>
        <LoadingBar color="#18181b" ref={ref} />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center p-2">
            <h2 className="h2">Admins</h2>
            <Button
              className="flex items-center gap-2"
              onClick={handleAddAdmin}
              disabled={!admins}
            >
              Add admin <PlusIcon />
            </Button>
          </div>
          <div className="w-full h-[2px] bg-slate-100 my-7"></div>
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
                              <TooltipTrigger
                                disabled={deleteLoading}
                                onClick={() => handleDelete(id)}
                              >
                                <span
                                  className={buttonVariants({
                                    variant: "destructive",
                                    size: "icon",
                                  })}
                                >
                                  {deleteLoading ? (
                                    <UpdateIcon className="animate-spin" />
                                  ) : (
                                    <TrashIcon />
                                  )}
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
      </>
    );
  } else return <Navigate to="/login" />;
}

export default Admins;
