//
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function GeneralSearch({ handleEnableToFilter }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <Label htmlFor="search">Search</Label>
      <Input
        value={value}
        onChange={({ target: { value } }) => {
          setValue(value);
          handleEnableToFilter();
        }}
        name="search"
        id="search"
        placeholder="Searching..."
        type="search"
      />
    </div>
  );
}

export default GeneralSearch;
