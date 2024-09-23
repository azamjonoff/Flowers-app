import { Input } from "./ui/input";
import { Label } from "./ui/label";

function GeneralSearch() {
  return (
    <div>
      <Label htmlFor="search">Search</Label>
      <Input id="search" placeholder="Searching..." type="search" />
    </div>
  );
}

export default GeneralSearch;
