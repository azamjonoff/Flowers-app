import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import MyBarChart from "../components/MyBarChart";
import MyPieChart from "../components/MyPieChart";
import RadioGroupDemo from "../components/RadioGroupDemo";
import { Label } from "../components/ui/label";
import { collectStatisticData, needStatisticReport } from "../lib/my-utils";
import { useAppStore } from "../lib/zustand";

function Statistics() {
  const ref = useRef();
  const { flowers, admin } = useAppStore();
  const [color, setColor] = useState(1);
  const [stats, setStats] = useState(null);
  const [type, setType] = useState("bar");
  const [value, setValue] = useState("category");
  const { pathname } = useLocation();

  useEffect(() => {
    ref?.current.continuousStart();
    setStats(() => {
      return collectStatisticData(flowers, value);
    });
    ref?.current.complete();
  }, [color, value]);

  if (admin) {
    if (localStorage.getItem("lastPage") !== pathname) {
      localStorage.setItem("lastPage", pathname);
    }
    return (
      <>
        <LoadingBar color="#18181b" ref={ref} />
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="h2 tracking-wide font-semibold">Statistics</h2>
          </div>
          <div className="flex gap-5 mb-10">
            <div>
              <Label>Choose type for Chart</Label>
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
                      <SelectItem
                        key={theme}
                        value={theme}
                        className="capitalize"
                      >
                        {theme}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-3 inline-block">Choose chart color</Label>
              <RadioGroupDemo setColor={setColor} />
            </div>
          </div>

          {type === "bar" && stats && (
            <MyBarChart chartData={stats.result} themeColor={color} />
          )}
          {type === "pie" && stats && (
            <MyPieChart
              chartData={stats.result}
              values={stats.data}
              themeColor={color}
            />
          )}
        </div>
      </>
    );
  } else return <Navigate to="/login" />;
}

export default Statistics;
