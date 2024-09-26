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
    <>
      <div className="w-full">
        <Label className="h1">Sorting by country</Label>
        <Select
          name="country"
          className="w-full"
          onValueChange={handleEnableToFilter}
        >
          <SelectTrigger className="w-full">
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
    </>
  );
}

export default FilterByCountry;
