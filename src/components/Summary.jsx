import { useState } from "react";
import { toast } from "sonner";
import { summaryLimit } from "../lib/constants";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

function Summary({ text }) {
  const [value, setValue] = useState(text ? text : "");

  function writer(e) {
    if (!(e.target.value.length > summaryLimit)) {
      setValue(e.target.value);
    } else {
      toast.dismiss();
      toast.warning(`You cannot enter more than ${summaryLimit} characters.`);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-1 grid w-full gap-1.5">
        <Label htmlFor="summary">About flower*</Label>
        <Textarea
          value={value}
          onChange={writer}
          placeholder="Enter information about flowers..."
          id="summary"
          name="summary"
        />
      </div>
      <span className="ml-auto block text-muted-foreground">
        {value.length} / {summaryLimit}
      </span>
    </div>
  );
}

export default Summary;
