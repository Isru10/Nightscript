"use client"
import { TrendingUp } from "lucide-react"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Label, Pie, PieChart } from "recharts"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const AppPieChart = () => {
  const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0)

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Browser usage </h1>

      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                return (
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                    <tspan className="fill-foreground text-3xl font-bold">{totalVisitors.toLocaleString()}</tspan>
                    <tspan x="50%" dy="1.2em" className="fill-muted-foreground text-2xl ">
                      Visitors
                    </tspan>
                  </text>
                )
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
      </div>
    </div>
  )
}

export default AppPieChart
