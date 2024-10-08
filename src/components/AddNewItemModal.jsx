// dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

//components
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import SelectCategory from "./SelectCategory";

// lib
import { useAppStore } from "../lib/zustand";
import SelectColor from "./SelectColor";
import { SelectCountry } from "./SelectCountry";
import LifeTime from "./LifeTime";
import UploadImage from "./UploadImage";
import { Button } from "./ui/button";
import { getFormData, validation } from "../lib/my-utils";
import { toast } from "sonner";
import Summary from "./Summary";
import { refreshToken, sendFlower } from "../request";
import { useEffect, useState } from "react";
import { UpdateIcon } from "@radix-ui/react-icons";

function AddNewItemModal({ sendingData, setSendingData }) {
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const addItemModal = useAppStore((state) => state.addItemModal);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    const { checker, errorMessage } = validation(result);
    if (checker) {
      toast.warning(errorMessage);
    } else {
      setSendingData(result);
    }
  };

  useEffect(() => {
    if (sendingData) {
      setLoading(true);
      sendFlower(admin?.access_token, sendingData)
        .then((res) => {
          toast.dismiss();
          toast.success(res);
          setSendingData(null);
          setAddItemModal();
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
        .finally(() => setLoading(false));
    }
  }, [sendingData, admin]);

  return (
    <Dialog open={addItemModal} onOpenChange={setAddItemModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add information</DialogTitle>
          <DialogDescription>
            By entering the data correctly into the inputs, new information can
            be added.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 max-h-80 overflow-y-auto px-2">
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
          </div>

          <div className="flex justify-between items-center mt-3">
            <Button type="button" variant="secondary" onClick={setAddItemModal}>
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? <UpdateIcon className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewItemModal;
