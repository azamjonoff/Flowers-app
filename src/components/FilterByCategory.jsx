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

function FilterByCategory({ categories, handleEnableToFilter }) {
  const [open, setOpen] = useState(false);

  const handleFocus = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div>
        <Label onClick={handleFocus} className="h1">
          Sorting by category
        </Label>
        <Select
          name="category"
          open={open}
          onOpenChange={setOpen}
          onValueChange={handleEnableToFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="By Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => {
                return (
                  <SelectItem key={category} value={category}>
                    {category}
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

export default FilterByCategory;
