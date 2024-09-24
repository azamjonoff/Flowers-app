//
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function GeneralSearch({ handleEnableToFilter }) {
  const [value, setValue] = useState("");
  return (
    <div className="w-full flex flex-col items-center gap-2 my-4 justify-center">
      <Label htmlFor="search">Searching</Label>
      <Input
        className="max-w-96 w-full"
        value={value}
        onChange={({ target: { value } }) => {
          setValue(value);
          handleEnableToFilter();
        }}
        name="search"
        id="search"
        placeholder="Not available yet"
        type="search"
        disabled
      />
    </div>
  );
}

export default GeneralSearch;
