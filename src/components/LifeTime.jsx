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
          <Input placeholder="Enter the period" type="text" name="lifetime" />
        </div>
      </div>
    </div>
  );
}

export default LifeTime;
