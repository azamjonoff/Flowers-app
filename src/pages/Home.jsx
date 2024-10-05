// react
import { useEffect, useState } from "react";

// lib
import { useAppStore } from "../lib/zustand";
import { collectItem, findObj, limit } from "../lib/my-utils";

// request
import { deleteFlower, getFlowers, refreshToken } from "../request";

// sonner
import { toast } from "sonner";

//components
import AddNewItemModal from "../components/AddNewItemModal";
import MyPagination from "../components/MyPagination";
import FilterByCategory from "../components/FilterByCategory";
import FilterByCountry from "../components/FilterByCountry";
import FilterByColor from "../components/FilterByColor";
import GeneralSearch from "../components/GeneralSearch";

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
import { getFormData } from "../lib/my-utils";

// tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditFlower from "../components/EditFLower";

function Home() {
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
  const flowers = useAppStore((state) => state.flowers);
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const setFlowers = useAppStore((state) => state.setFlowers);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);
  const setEditModal = useAppStore((state) => state.setEditModal);

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
    setEditModal();
    const result = findObj(flowers, id);
    setEditedData(result);
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
      .finally(() => setLoading(false));
  }, [admin, skip, isFiltered, sendingData, deletedData, editing]);

  return (
    <>
      <div className="base-container py-5">
        <div className="flex justify-between items-center my-3">
          <h2 className="h2">Dashboard</h2>
          <Button
            className="flex items-center gap-2"
            onClick={setAddItemModal}
            disabled={flowers ? false : true}
          >
            Add <PlusIcon />
          </Button>
        </div>

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

        <Table>
          <TableCaption>
            {loading ? "Loading..." : "Information of flowers"}
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
                            deletedData && deletedData === id && deleteLoading
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
        {flowers && (
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
      <AddNewItemModal
        sendingData={sendingData}
        setSendingData={setSendingData}
      />
      {editedData && (
        <EditFlower
          editedData={editedData}
          editing={editing}
          setEditing={setEditing}
        />
      )}
    </>
  );
}

export default Home;
