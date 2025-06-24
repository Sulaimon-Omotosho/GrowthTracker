'use client'

import * as React from 'react'
import { Label, Pie, PieChart, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function CountChart({
  desktopData,
  data,
  chartConfig,
}: {
  desktopData: { attribute: string; desktop: number; fill: string }[]
  data: { title: string; total: number }
  chartConfig: ChartConfig
}) {
  const id = 'Registered Members'
  const [activeState, setActiveState] = React.useState(desktopData[0].attribute)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.attribute === activeState),
    [activeState, desktopData]
  )
  const months = React.useMemo(
    () => desktopData.map((item) => item.attribute),
    [desktopData]
  )

  const activeLabel =
    chartConfig[activeState.toLowerCase()]?.label || activeState

  return (
    <Card data-chart={id} className='flex flex-col h-full w-full'>
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className='flex-row items-start gap-2 space-y-0 pb-0'>
        <div className='grid gap-1'>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>Total - {data.total}</CardDescription>
        </div>
        <Select value={activeState} onValueChange={setActiveState}>
          <SelectTrigger
            className='ml-auto h-7 w-[130px] rounded-lg pl-2.5'
            aria-label='Select a value'
          >
            <SelectValue placeholder='Select Attribute' />
          </SelectTrigger>
          <SelectContent
            align='end'
            className='rounded-xl bg-white dark:bg-black'
          >
            {months.map((key) => {
              const normalizedKey = key.toLowerCase()
              const config =
                chartConfig[normalizedKey as keyof typeof chartConfig]

              if (!config) {
                // console.error(`No config found for key: ${key}`)
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className='rounded-lg [&_span]:flex bg-white dark:bg-black'
                >
                  <div className='flex items-center gap-2 text-xs'>
                    <span
                      className='flex h-3 w-3 shrink-0 rounded-sm'
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='flex flex-1 justify-center pb-0 relative'>
        <div className='absolute z-50 items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h2 className='font-bold text-3xl text-center'>
            {desktopData[activeIndex].desktop.toLocaleString()}
          </h2>
          <p className='capitalize text-xs text-center'>{activeLabel}</p>
        </div>
        <ChartContainer
          id={id}
          config={chartConfig}
          className='mx-auto aspect-square w-full max-w-[300px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey='desktop'
              nameKey='attribute'
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      {/* BOTTOM  */}
      <div className='flex justify-evenly items-center text-center pb-2'>
        {desktopData.map((item, i) => (
          <div key={i} className='flex flex-col gap-1 items-center'>
            <div
              className={`w-5 h-5 rounded-full`}
              style={{ backgroundColor: item.fill }}
            ></div>
            <h1 className='font-bold'>{item.desktop}</h1>
            <span className='text-xs'>
              ({((item.desktop / data.total) * 100).toFixed(1)}%)
            </span>
            <h2 className='text-xs text-gray-500'>{item.attribute}</h2>
          </div>
        ))}
      </div>
    </Card>
  )
}
