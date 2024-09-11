// dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

//
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

function AddNewItemModal() {
  return (
    <Dialog>
      {/* <DialogTrigger></DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Flower name*</Label>
            <Input id="name" placeholder="Enter flower name" name="name" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewItemModal;
