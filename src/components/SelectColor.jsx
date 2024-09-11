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
          <SelectValue placeholder="Select color">
            <div className="flex items-center gap-2">
              <span
                style={{ backgroundColor: value }}
                className="inline-block rounded-full inset-0 h-4 w-4 hover:border hover:border-black"
              ></span>
              {value.toLowerCase()}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="!h-[200px] overflow-y-auto">
          {collectItem(flowers, "color").map((color) => {
            return (
              <SelectItem key={color} value={color}>
                <div className="flex items-center gap-2">
                  <span
                    style={{ backgroundColor: color }}
                    className="inline-block rounded-full inset-0 h-4 w-4 hover:border hover:border-black"
                  ></span>
                  <span className="font-medium lowercase">{color}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectColor;
