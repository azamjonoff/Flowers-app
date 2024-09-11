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

function SelectColor() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const flowers = useAppStore((state) => state.flowers);

  const handleFocus = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Label onClick={handleFocus}>Select color*</Label>
      <Select
        value={value}
        onValueChange={setValue}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className="w-[180px] relative">
          <SelectValue placeholder="Select color">{value}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {collectItem(flowers, "color").map((color) => {
            return (
              <SelectItem className="relative" key={color} value={color}>
                <span
                  style={{ backgroundColor: color }}
                  className="absolute inset-0 h-full w-full hover:border hover:border-black"
                ></span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectColor;
