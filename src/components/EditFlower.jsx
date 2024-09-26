// dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

//components
import { Label } from "./ui/label";
import { Input } from "./ui/input";
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
import { editFlower, refreshToken } from "../request";
import { useEffect, useState } from "react";
import { UpdateIcon } from "@radix-ui/react-icons";

function EditFlower({ editedData, editing, setEditing }) {
  const admin = useAppStore((state) => state.admin);
  const setAdmin = useAppStore((state) => state.setAdmin);
  const editModal = useAppStore((state) => state.editModal);
  const setEditModal = useAppStore((state) => state.setEditModal);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    const { checker, errorMessage } = validation(result);
    if (checker) {
      toast.warning(errorMessage);
    } else {
      setEditing({ ...result, id: editedData.id });
    }
  };

  useEffect(() => {
    if (editing) {
      setLoading(true);
      editFlower(admin?.access_token, editing)
        .then((res) => {
          toast.dismiss();
          toast.success(res);
          setEditing(null);
          setEditModal();
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
  }, [admin, editing]);

  return (
    <Dialog open={editModal} onOpenChange={setEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit information</DialogTitle>
          <DialogDescription>
            It is necessary to enter correct information into the inputs to edit
            the data.
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
            <Button type="button" variant="secondary" onClick={setEditModal}>
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

export default EditFlower;
