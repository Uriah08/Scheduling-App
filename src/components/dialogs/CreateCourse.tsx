import { courseSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DialogClose, DialogContent, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { useCreateCourseMutation } from '@/store/api';
import { toast } from 'sonner';

type CreateProfessorProps = {
    onOpenChange: (open: boolean) => void;
}

const prerequisites = [
  {
    id: 'DCIT 21',
    label: 'DCIT 21'
  },
  {
    id: 'DCIT 22',
    label: 'DCIT 22'
  },
  {
    id: 'DCIT 23',
    label: 'DCIT 23'
  }
] as const

const CreateCourse = ({ onOpenChange }: CreateProfessorProps) => {
    const [createCourse, {isLoading}] = useCreateCourseMutation()
    const form = useForm<z.infer<typeof courseSchema>>({
            resolver: zodResolver(courseSchema),
            defaultValues: {
                code: "",
                title: "",
                creditLec: "1",
                creditLab: "0",
                contactLec: "1",
                contactLab: "0",
                prerequisites: []
            },
        })
    
        async function onSubmit(values: z.infer<typeof courseSchema>) {
            try {
                await createCourse(values).unwrap()
                toast('New Course Created Successfully')
                onOpenChange(false);
                form.reset();
            } catch (err: unknown) {
                console.log(err);
            }
        }

  return (
    <DialogContent>
        <DialogTitle>Create Course</DialogTitle>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
                <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Program</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className='w-full'>
                        <SelectTrigger>
                            <SelectValue placeholder="Select program"/>
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                        <Input placeholder="Code" {...field}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Course TItle" {...field}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
                <div className='flex flex-col gap-3'>
                    <h1 className='text-normal font-medium'>Credit</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        <FormField
                        control={form.control}
                        name="creditLec"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Lecture</FormLabel>
                            <FormControl>
                                <Input type='number' {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="creditLab"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Laboratory</FormLabel>
                            <FormControl>
                                <Input type='number' {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <h1 className='text-normal font-medium'>Contact Hours</h1>
                    <div className='grid grid-cols-2 gap-3'>
                        <FormField
                        control={form.control}
                        name="contactLec"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Lecture</FormLabel>
                            <FormControl>
                                <Input type='number' {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="contactLab"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Laboratory</FormLabel>
                            <FormControl>
                                <Input type='number' {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormLabel>Prerequisites</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <button className='text-sm text-zinc-500 py-2 px-3 border rounded-sm w-full text-start cursor-text'>Pick Prerequisites</button>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-96">
                        <FormField
                        control={form.control}
                        name="prerequisites"
                        render={() => (
                            <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Code</FormLabel>
                            </div>
                            {prerequisites.map((item) => (
                                <FormField
                                key={item.id}
                                control={form.control}
                                name="prerequisites"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={item.id}
                                        className="flex flex-row items-center gap-2"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...(field.value ?? []), item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== item.id
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                        {item.label}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </PopoverContent>
                </Popover>
                <div className='flex w-full justify-end gap-3'>
                    <DialogClose asChild> 
                        <Button variant={'outline'} className='border-zinc-400 cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className='bg-[#0b6602] hover:bg-[#084e02] cursor-pointer'>Create</Button>
                </div>
            </form>
        </Form>
    </DialogContent>
  )
}

export default CreateCourse