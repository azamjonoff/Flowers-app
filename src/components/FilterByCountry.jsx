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

function FilterByCountry({ countries, handleEnableToFilter }) {
  return (
    <div>
      <div>
        <Label className="h1">Sorting by country</Label>
        <Select name="country" onValueChange={handleEnableToFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="By countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Countries</SelectLabel>
              {countries.map((country) => {
                return (
                  <SelectItem key={country} value={country}>
                    {country}
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

export default FilterByCountry;
