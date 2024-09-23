import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// components
import { Label } from "./ui/label";
import { useState } from "react";

function FilterByColor({ colors, handleEnableToFilter }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleFocus = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div>
        <Label onClick={handleFocus} className="h1">
          Sorting by colors
        </Label>
        <Select
          name="color"
          onValueChange={(value) => {
            setValue(value);
            handleEnableToFilter();
          }}
          onOpenChange={setOpen}
          open={open}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="By color">
              <div className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: value }}
                  className="inline-block rounded-full inset-0 h-4 w-4 hover:border hover:border-black"
                ></span>
                {value.toLowerCase()}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Colors</SelectLabel>
              {colors.map((color) => {
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
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default FilterByColor;
