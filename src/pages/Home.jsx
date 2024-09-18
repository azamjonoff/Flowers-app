// react
import { useEffect, useState } from "react";

// lib
import { useAppStore } from "../lib/zustand";

// request
import { getFlowers, refreshToken } from "../request";

// sonner
import { toast } from "sonner";

//components
import AddNewItemModal from "../components/AddNewItemModal";

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
import { UpdateIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";

// lib
import { getFormData } from "../lib/my-utils";

function Home() {
  const [loading, setLoading] = useState(false);
  const flowers = useAppStore((state) => state.flowers);
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const setFlowers = useAppStore((state) => state.setFlowers);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  useEffect(() => {
    setLoading(true);
    getFlowers(admin?.access_token)
      .then(({ data }) => {
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
  }, [admin]);

  return (
    <>
      <div className="base-container">
        <div className="flex justify-between items-center my-3">
          <h2 className="h2">Dashboard</h2>
          <Button className="flex items-center gap-2" onClick={setAddItemModal}>
            Add <PlusIcon />
          </Button>
        </div>
        <Table className="relative h-screen">
          {loading ? (
            <TableCaption className="flex items-center gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-black font-medium">
              Yuklanmoqda... <UpdateIcon className="animate-spin" />
            </TableCaption>
          ) : (
            <TableCaption>Information about flowers</TableCaption>
          )}
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
      </div>
      <AddNewItemModal />
    </>
  );
}

export default Home;
