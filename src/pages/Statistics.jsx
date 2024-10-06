import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../components/ui/label";
import { collectStatisticData, needStatisticReport } from "../lib/my-utils";
import MyBarChart from "../components/MyBarChart";
import { useEffect, useState } from "react";
import MyPieChart from "../components/MyPieChart";
import { useAppStore } from "../lib/zustand";

function Statistics() {
  const [stats, setStats] = useState(null);
  const flowers = useAppStore((state) => state.flowers);
  const [type, setType] = useState("bar");
  const [value, setValue] = useState("category");
  console.log(stats);

  useEffect(() => {
    if (flowers) {
      setStats(() => {
        return collectStatisticData(flowers, value);
      });
    }
  }, [flowers, value]);

  function handleSelect() {}

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="h2">Statistics</h2>
      </div>
      <div className="flex gap-5 mb-10">
        <div>
          <Label onClick={handleSelect}>Choose type for Chart</Label>
          <Select value={type} onValueChange={(value) => setType(value)}>
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
          <Select value={value} onValueChange={(value) => setValue(value)}>
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
      {type === "bar" && stats && <MyBarChart stats={stats} />}
      {type === "pie" && stats && <MyPieChart stats={stats} />}
    </div>
  );
}

export default Statistics;
