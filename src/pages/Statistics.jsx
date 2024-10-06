import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../components/ui/label";
import { needStatisticReport } from "../lib/my-utils";
import MyBarChart from "../components/MyBarChart";
import { useState } from "react";

function Statistics() {
  const [value, setValue] = useState("bar");

  function handleSelect() {}

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="h2">Statistics</h2>
      </div>
      <div className="flex gap-5 mb-10">
        <div>
          <Label onClick={handleSelect}>Choose type for Chart</Label>
          <Select value={value} onValueChange={(value) => setValue(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chart" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar chart</SelectItem>
              <SelectItem value="pie">Pie chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Choose theme</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {needStatisticReport.map((theme) => {
                return (
                  <SelectItem key={theme} value={theme} className="capitalize">
                    {theme}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      {value === "bar" ? <MyBarChart /> : ""}
      {/* <MyPieChart /> */}
    </div>
  );
}

export default Statistics;
