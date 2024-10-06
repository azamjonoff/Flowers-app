import { Pie, PieChart, LabelList } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

export const description = "A pie chart with a custom label";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

export default function MyPieChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[350px] w-full"
    >
      <PieChart>
        <Pie
          data={chartData}
          dataKey="visitors"
          labelLine={true}
          label={({ payload, ...props }) => {
            return (
              <text
                cx={props.cx}
                cy={props.cy}
                x={props.x}
                y={props.y}
                textAnchor={props.textAnchor}
                dominantBaseline={props.dominantBaseline}
                fill="hsla(var(--foreground))"
              >
                {`${payload.visitors}`}
              </text>
            );
          }}
          nameKey="browser"
        >
          <LabelList
            dataKey="browser"
            className="fill-background"
            stroke="none"
            fontSize={12}
            formatter={(value) => chartConfig[value]?.label}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
