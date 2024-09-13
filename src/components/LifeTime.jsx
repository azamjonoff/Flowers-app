import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "./ui/input";
import { periods } from "../lib/my-utils";
import { Label } from "./ui/label";

function LifeTime() {
  return (
    <div>
      <div className="mb-2">
        <Label className="mb-1">From period*</Label>
        <div className="flex justify-between items-center gap-5">
          <Input placeholder="Enter the period" type="number" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Period format" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => {
                return (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="mb-1">Until period*</Label>
        <div className="flex justify-between items-center gap-5">
          <Input placeholder="Enter the period" type="number" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Period format" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => {
                return (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default LifeTime;
