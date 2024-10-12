import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppStore } from "../lib/zustand";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function EditAdmin() {
  const { adminEditSheet, setAdminEditSheet } = useAppStore();
  return (
    <Sheet open={adminEditSheet} onOpenChange={setAdminEditSheet}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Edit admin information</SheetTitle>
          <SheetDescription>
            Here you can edit admin information
          </SheetDescription>
        </SheetHeader>

        <form>
          <div>
            <Label htmlFor="username">Username:</Label>
            <Input
              name="username"
              placeholder="Edit username"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input
              name="password"
              placeholder="Edit password"
              autoComplete="off"
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default EditAdmin;
