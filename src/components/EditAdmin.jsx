import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getFormData } from "../lib/my-utils";
import { useAppStore } from "../lib/zustand";
import { editAdmin, refreshToken } from "../request";

function EditAdmin({ editedAdmin, setAdmins }) {
  const { admin, setAdmin, adminEditSheet, setAdminEditSheet } = useAppStore();
  const [editingAdmin, setEditingAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const result = getFormData(e.target);
    setEditingAdmin({ ...result, id: editedAdmin.id });
  }

  useEffect(() => {
    if (editingAdmin) {
      setLoading(true);
      editAdmin(admin?.access_token, editingAdmin)
        .then((data) => {
          setAdmins((admins) => {
            const filteredData = admins.filter(
              (admin) => admin.id !== editingAdmin.id
            );
            toast.success("Data successfully edited");
            setAdminEditSheet();
            return [...filteredData, data];
          });
        })
        .catch(({ message }) => {
          if (message === "403") {
            refreshToken(admin?.refresh_token)
              .then(({ access_token }) => {
                setAdmin(...admin, access_token);
              })
              .catch(() => {
                toast.info("Please logIn again");
                setAdmin(null);
              });
          }
        })
        .finally(() => {
          setLoading(false);
          setEditingAdmin(null);
        });
    }
  }, [editingAdmin, admin]);

  return (
    <Sheet open={adminEditSheet} onOpenChange={setAdminEditSheet}>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Edit admin information</SheetTitle>
          <SheetDescription>
            Here you can edit admin information
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 max-w-2xl w-full mx-auto"
        >
          <div>
            <Label htmlFor="username">Username:</Label>
            <Input
              defaultValue={editedAdmin?.username}
              name="username"
              placeholder="Edit username"
              autoComplete="off"
            />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input
              defaultValue={editedAdmin?.password}
              type="password"
              name="password"
              placeholder="Edit password"
              autoComplete="off"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <UpdateIcon className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default EditAdmin;
