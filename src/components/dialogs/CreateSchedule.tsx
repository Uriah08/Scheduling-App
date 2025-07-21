'use client'

import React from 'react'
import { DialogClose, DialogContent, DialogTitle } from '../ui/dialog'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { scheduleSchema, years } from '@/schemas'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCreateScheduleMutation } from '@/store/api'
import { toast } from "sonner"

type CreateScheduleProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CreateSchedule = ({ open, onOpenChange }: CreateScheduleProps) => {
    const [createSchedule, { isLoading }] = useCreateScheduleMutation();
    const form = useForm<z.infer<typeof scheduleSchema>>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
        name: "",
        description: "",
        year: "",
        semester: ""
        },
    })

    async function onSubmit(values: z.infer<typeof scheduleSchema>) {
        try {
            const result = await createSchedule(values).unwrap();
            toast('New Schedule Created Successfully')
            onOpenChange(false);
            form.reset();
        } catch (err: any) {
            toast(err.data.error)
        }
    }
  return (
    <DialogContent>
        <DialogTitle>Create Schedule</DialogTitle>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Schedule Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Schedule" {...field}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Description" {...field} className='resize-none'/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className='w-full'>
                        <SelectTrigger>
                            <SelectValue placeholder="Select semester"/>
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="1st Semester">1st Semester</SelectItem>
                        <SelectItem value="2nd Semester">2nd Semester</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                    <FormLabel>Year</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value
                                ? years.find(
                                    (year) => year.value === field.value
                                )?.label
                                : "Select year"}
                            <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput
                            placeholder="Search year..."
                            className="h-9 w-full"
                            />
                            <CommandList>
                            <CommandEmpty>No year found.</CommandEmpty>
                            <CommandGroup>
                                {years.map((year) => (
                                <CommandItem
                                    value={year.label}
                                    key={year.value}
                                    onSelect={() => {
                                    form.setValue("year", year.value)
                                    }}
                                >
                                    {year.label}
                                    <Check
                                    className={cn(
                                        "ml-auto",
                                        year.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                    />
                                </CommandItem>
                                ))}
                            </CommandGroup>
                            </CommandList>
                        </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className='flex w-full justify-end gap-3'>
                    <DialogClose asChild> 
                        <Button variant={'outline'} className='border-zinc-400 cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    <Button disabled={isLoading} type="submit" className='bg-[#0b6602] hover:bg-[#084e02] cursor-pointer'>{isLoading ? 'Creating' : 'Create'}</Button>
                </div>
            </form>
        </Form>
    </DialogContent>
  )
}

export default CreateSchedule