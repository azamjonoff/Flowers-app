// lib
import { collectCategory } from "../lib/my-utils";
import { useAppStore } from "../lib/zustand";

// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectCategory() {
  const flowers = useAppStore((state) => state.flowers);
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        {collectCategory(flowers).map((category) => {
          return (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default SelectCategory;
