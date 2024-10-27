// react
import { useEffect, useRef, useState } from "react";

// lib collectItem, findObj, limit

import { useAppStore } from "../lib/zustand";

// request
import { deleteFlower, getFlowers, refreshToken } from "../request";

// sonner
import { toast } from "sonner";

//components
import FilterByCategory from "../components/FilterByCategory";
import FilterByColor from "../components/FilterByColor";
import FilterByCountry from "../components/FilterByCountry";
import GeneralSearch from "../components/GeneralSearch";
import MyPagination from "../components/MyPagination";

// table
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// btn
import { Button, buttonVariants } from "../components/ui/button";

// icon
import {
  GridIcon,
  Pencil1Icon,
  SymbolIcon,
  TrashIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";

// lib
import { collectItem, getFormData } from "../lib/my-utils";

// tooltip
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Navigate, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import LifeTime from "../components/LifeTime";
import SelectCategory from "../components/SelectCategory";
import SelectColor from "../components/SelectColor";
import { SelectCountry } from "../components/SelectCountry";
import Summary from "../components/Summary";
import { Label } from "../components/ui/label";
import UploadImage from "../components/UploadImage";
import { limit } from "../lib/constants";

function Home() {
  const ref = useRef(null);
  const [editing, setEditing] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletedData, setDeletedData] = useState(null);
  const [sendingData, setSendingData] = useState(null);
  const [isFiltered, setIsFiltered] = useState(null);
  const [enableToFilter, setEnableToFilter] = useState(true);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { flowers, admin, setAdmin, setFlowers, setActiveSheet } =
    useAppStore();
  const { pathname } = useLocation();

  function reset() {
    setIsFiltered(null);
    setEnableToFilter(true);
  }

  function handleFilter(e) {
    e.preventDefault();
    const result = getFormData(e.target);
    setIsFiltered(result);
  }

  function handleEnableToFilter() {
    setEnableToFilter(false);
  }

  function handleDelete(id) {
    setDeletedData(id);
  }

  function handleEdit(id) {
    const result = findObj(flowers, id);
    setEditedData(result);
    setActiveSheet({
      title: "Edit information",
      description:
        "It is necessary to enter correct information into the inputs to edit the data.",
      children: (
        <form>
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto px-2">
            <div>
              <Label htmlFor="name">Flower name*</Label>
              <Input
                id="name"
                placeholder="Enter flower name"
                name="name"
                autoComplete="off"
                defaultValue={editedData.name}
              />
            </div>
            <div className="mt-2">
              <Label htmlFor="price">Flower price* (uzs)</Label>
              <Input
                min="0"
                id="price"
                placeholder="Enter flower price"
                name="price"
                autoComplete="off"
                type="number"
                defaultValue={editedData.price}
              />
            </div>
            <div className="flex items-center gap-5 mt-2">
              <SelectCategory outsideCategory={editedData.category} />
              <SelectColor outsideColor={editedData.color} />
            </div>

            <SelectCountry outsideCountry={editedData.country} />

            <Summary text={editedData.summary} />

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="smell">Smell*</Label>
              <Input
                className="!w-full"
                type="text"
                id="smell"
                placeholder="Enter the scent of the flower"
                name="smell"
                defaultValue={editedData.smell}
              />
            </div>

            <LifeTime time={editedData.lifetime} />

            <UploadImage outsideImage={editedData.imgUrl} />
          </div>

          <div className="flex justify-between items-center mt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveSheet(null, "right")}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? <UpdateIcon className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      ),
    });
  }

  function handleAddItem() {
    setActiveSheet(
      {
        title: "Add information",
        description:
          "By entering the data correctly into the inputs, new information can be added.",
        children: (
          <form className="flex flex-col gap-2">
            <div>
              <Label htmlFor="name">Flower name*</Label>
              <Input
                id="name"
                placeholder="Enter flower name"
                name="name"
                autoComplete="off"
              />
            </div>
            <div className="mt-2">
              <Label htmlFor="price">Flower price* (uzs)</Label>
              <Input
                min="0"
                id="price"
                placeholder="Enter flower price"
                name="price"
                autoComplete="off"
                type="number"
              />
            </div>
            <div className="flex items-center gap-5 mt-2">
              <SelectCategory />
              <SelectColor />
            </div>

            <SelectCountry />

            <Summary />
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="smell">Smell*</Label>
              <Input
                className="!w-full"
                type="text"
                id="smell"
                placeholder="Enter the scent of the flower"
                name="smell"
              />
            </div>

            <LifeTime />

            <UploadImage />

            <div className="flex justify-between items-center mt-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setActiveSheet(null, "right")}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                {loading ? <UpdateIcon className="animate-spin" /> : "Submit"}
              </Button>
            </div>
          </form>
        ),
      },
      "right"
    );
  }

  // Delete flower
  useEffect(() => {
    if (deletedData) {
      setDeleteLoading(true);
      deleteFlower(admin?.access_token, deletedData)
        .then((res) => {
          toast.dismiss();
          toast.success(res);
          setDeletedData(null);
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken(admin?.refresh_token)
              .then(({ access_token }) => {
                setAdmin({ ...admin, access_token });
              })
              .catch(() => {
                toast.info("Please login again");
                setAdmin(null);
              });
          }
          toast.error(message);
        })
        .finally(() => setDeleteLoading(false));
    }
  }, [deletedData, admin]);

  // get flowers
  useEffect(() => {
    ref?.current.continuousStart();
    setLoading(true);
    getFlowers(admin?.access_token, { skip, limit }, isFiltered)
      .then(({ data, total }) => {
        setTotal(total);
        setFlowers(data);
      })
      .catch(({ message }) => {
        if (message === "403") {
          refreshToken(admin?.refresh_token)
            .then(({ access_token }) => {
              setAdmin({ ...admin, access_token });
            })
            .catch(() => {
              toast.info("Please log in again!");
              setAdmin(null);
            });
        }
      })
      .finally(() => {
        setLoading(false);
        ref?.current.complete();
      });
  }, [admin, skip, isFiltered, sendingData, deletedData, editing]);

  if (admin) {
    if (localStorage.getItem("lastPage") !== pathname) {
      localStorage.setItem("lastPage", pathname);
    }
    return (
      <>
        <LoadingBar color="#18181b" ref={ref} />
        <div className="flex w-full !h-full">
          <div className="w-full h-full bg-white">
            <div className="flex justify-between items-center">
              <h2 className="h2">Dashboard</h2>
              <Button
                className="flex items-center gap-2"
                onClick={handleAddItem}
                disabled={flowers ? false : true}
              >
                Add <PlusIcon />
              </Button>
            </div>

            <div className="w-full h-[2px] bg-slate-100 my-7"></div>

            {flowers && (
              <form onSubmit={handleFilter}>
                <div className="grid grid-cols-3 gap-8 mb-4 w-full">
                  <FilterByCategory
                    categories={collectItem(flowers, "category")}
                    handleEnableToFilter={handleEnableToFilter}
                  />
                  <FilterByCountry
                    countries={collectItem(flowers, "country")}
                    handleEnableToFilter={handleEnableToFilter}
                  />
                  <FilterByColor
                    colors={collectItem(flowers, "color")}
                    handleEnableToFilter={handleEnableToFilter}
                  />
                </div>
                <div className="flex gap-10 justify-end">
                  <Button
                    variant="outline"
                    disabled={enableToFilter}
                    onClick={reset}
                    type="button"
                  >
                    Clear Filter <SymbolIcon className="ml-2" />
                  </Button>
                  <Button type="submit" disabled={enableToFilter}>
                    Filtering <GridIcon className="ml-2" />
                  </Button>
                </div>
                <div className="flex justify-center mb-4">
                  <GeneralSearch handleEnableToFilter={handleEnableToFilter} />
                </div>
              </form>
            )}

            <div className="max-h-96  h-full overflow-y-scroll">
              <Table>
                <TableCaption>
                  {loading
                    ? "Loading..."
                    : flowers?.length === 0
                    ? "There is no flowers"
                    : "Information of flowers"}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Flower name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flowers?.map(({ name, id, color, category, price }) => {
                    return (
                      <TableRow key={id}>
                        <TableCell className="font-medium">{id}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{category}</TableCell>
                        <TableCell>
                          <span
                            style={{ backgroundColor: color }}
                            className="block w-3 h-3 rounded-full border shadow-xl text-center"
                          ></span>
                        </TableCell>
                        <TableCell className="text-right">{price}</TableCell>
                        <TableCell className="flex justify-end gap-3">
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
                                <p>Edit this item</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider delayDuration="0">
                            <Tooltip>
                              <TooltipTrigger
                                className={
                                  deletedData &&
                                  deletedData === id &&
                                  deleteLoading
                                    ? "pointer-events-none opacity-60"
                                    : ""
                                }
                                onClick={() => handleDelete(id)}
                              >
                                <span
                                  className={buttonVariants({
                                    variant: "destructive",
                                    size: "icon",
                                  })}
                                >
                                  {deletedData &&
                                  deletedData === id &&
                                  deleteLoading ? (
                                    <UpdateIcon className="animate-spin" />
                                  ) : (
                                    <TrashIcon />
                                  )}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete this item</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {flowers?.length > limit && (
              <div className="mt-5">
                <MyPagination
                  setSkip={setSkip}
                  total={total}
                  pageCount={Math.ceil(total / limit)}
                  skip={skip}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else return <Navigate to="/login" />;
}

export default Home;
