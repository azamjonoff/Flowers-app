import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a custom label";

export default function MyBarChart({ chartData, themeColor }) {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: `hsl(var(--chart-${themeColor}))`,
    },
    label: {
      color: "hsl(var(--background))",
    },
  };

  return (
    <ChartContainer className="h-[300px] w-full" config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="key"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="value" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="value"
          layout="vertical"
          fill="var(--color-desktop)"
          radius={4}
        >
          <LabelList
            dataKey="key"
            position="insideLeft"
            offset={8}
            className="fill-[--color-label]"
            fontSize={12}
          />
          <LabelList
            dataKey="value"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
