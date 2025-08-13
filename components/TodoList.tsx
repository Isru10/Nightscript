"use client"
import { useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Card } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"

const TodoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)
  return (
    <div className="">
      <h1 className="text-lg font-medium">TodoList</h1>
      {/* calender */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full">
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>

      <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
        {/* list items */}
        <div className="flex flex-col gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="item1" checked />
              <label htmlFor="item1" className="text-sm text-muted-foreground  ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              </label>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="item1" checked />
              <label htmlFor="item1" className="text-sm text-muted-foreground  ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              </label>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="item1" checked />
              <label htmlFor="item1" className="text-sm text-muted-foreground  ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              </label>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="item1" checked />
              <label htmlFor="item1" className="text-sm text-muted-foreground  ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              </label>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="item1" checked />
              <label htmlFor="item1" className="text-sm text-muted-foreground  ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              </label>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="item1" checked />
              <label htmlFor="item1" className="text-sm text-muted-foreground  ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              </label>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox id="item1" checked />
              <label htmlFor="item1" className="text-sm text-muted-foreground  ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
              </label>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}

export default TodoList
