// dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

//components
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import SelectCategory from "./SelectCategory";

// lib
import { useAppStore } from "../lib/zustand";
import SelectColor from "./SelectColor";

function AddNewItemModal() {
  const addItemModal = useAppStore((state) => state.addItemModal);
  const setAddItemModal = useAppStore((state) => state.setAddItemModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
  };

  return (
    <Dialog open={addItemModal} onOpenChange={setAddItemModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
            <Label htmlFor="price">Flower price*</Label>
            <Input
              id="price"
              placeholder="Enter flower price"
              name="price"
              autoComplete="off"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <SelectCategory />
            <SelectColor />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewItemModal;
