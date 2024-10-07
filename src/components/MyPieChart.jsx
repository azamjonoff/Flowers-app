import { Pie, PieChart, LabelList } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

export const description = "A pie chart with a custom label";

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

export default function MyPieChart({ chartData, values, themeColor }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[350px] w-full"
    >
      <PieChart>
        <Pie
          fill={`hsl(var(--chart-${themeColor}))`}
          data={chartData}
          dataKey="value"
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
                {`${payload.key}`}
              </text>
            );
          }}
          nameKey="key"
        >
          <LabelList
            dataKey="key"
            className="fill-background"
            stroke="none"
            fontSize={12}
            formatter={(value) => values[value]}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
