// react
import { useEffect, useState } from "react";

// lib
import { useAppStore } from "../lib/zustand";
import { collectItem, limit } from "../lib/my-utils";

// request
import { getFlowers, refreshToken } from "../request";

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
import { Button } from "../components/ui/button";

// icon
import { GridIcon, SymbolIcon, UpdateIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";

// lib
import { getFormData } from "../lib/my-utils";

function Home() {
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
  }, [admin, skip, isFiltered, sendingData]);

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
            <div className="grid grid-cols-3 gap-y-4 mb-4 w-full">
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
            <div className="flex gap-10 justify-center">
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
    </>
  );
}

export default Home;
