// lib
import { collectItem } from "../lib/my-utils";
import { useAppStore } from "../lib/zustand";

// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { useState } from "react";

function SelectCategory({ outsideCategory }) {
  const [open, setOpen] = useState(false);
  const flowers = useAppStore((state) => state.flowers);

  const handleFocus = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full">
      <Label onClick={handleFocus}>Select category*</Label>
      <Select
        defaultValue={outsideCategory && outsideCategory}
        open={open}
        onOpenChange={setOpen}
        name="category"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="!h-[200px] overflow-y-auto">
          {collectItem(flowers, "category").map((category) => {
            return (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectCategory;
