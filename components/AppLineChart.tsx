"use client"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", activity: 186 },
  { month: "Feb", activity: 305 },
  { month: "Mar", activity: 237 },
  { month: "Apr", activity: 273 },
  { month: "May", activity: 209 },
  { month: "Jun", activity: 214 },
]

const chartConfig = {
  activity: {
    label: "User Activity",
    color: "#dc2626", // red-600
  },
} satisfies ChartConfig

const AppLineChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-red-300" />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-red-300" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent className="bg-gray-800 border-red-900/50" />} />
        <Line
          dataKey="activity"
          type="monotone"
          stroke="var(--color-activity)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-activity)",
            strokeWidth: 2,
            r: 4,
          }}
          activeDot={{
            r: 6,
            stroke: "var(--color-activity)",
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default AppLineChart
