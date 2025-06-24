'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { month: 'January', present: 186, absent: 80 },
  { month: 'February', present: 305, absent: 200 },
  { month: 'March', present: 237, absent: 120 },
  { month: 'April', present: 73, absent: 190 },
  { month: 'May', present: 209, absent: 130 },
  { month: 'June', present: 214, absent: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Present',
    color: '#C3EBFA',
  },
  mobile: {
    label: 'Absent',
    color: '#FAE27C',
  },
} satisfies ChartConfig

export function AttendanceChart() {
  return (
    <Card className='h-[450px]'>
      <CardHeader>
        <CardTitle>APG 4</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: any) => {
                if (typeof value === 'string') {
                  return value.slice(0, 3)
                }
                return value
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dashed' />}
            />
            <Bar dataKey='present' fill='var(--color-desktop)' radius={4} />
            <Bar dataKey='absent' fill='var(--color-mobile)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
      </CardFooter>
    </Card>
  )
}
