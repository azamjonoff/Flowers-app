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
    <>
      <div className="w-full">
        <Label onClick={handleFocus} className="mb-2 inline-block">
          Sorting by category
        </Label>
        <Select
          className="w-full"
          name="category"
          open={open}
          onOpenChange={setOpen}
          onValueChange={handleEnableToFilter}
        >
          <SelectTrigger className="w-full">
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
    </>
  );
}

export default FilterByCategory;
