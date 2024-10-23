// dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

//components

// lib
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getFormData, validation } from "../lib/my-utils";
import { useAppStore } from "../lib/zustand";
import { refreshToken, sendFlower } from "../request";

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
      </DialogContent>
    </Dialog>
  );
}

export default AddNewItemModal;
