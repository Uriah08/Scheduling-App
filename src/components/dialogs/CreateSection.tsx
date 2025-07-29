import { sectionSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DialogClose, DialogContent, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCreateSectionMutation } from '@/store/api';
import { toast } from 'sonner';

type CreateSectionProps = {
    onOpenChange: (open: boolean) => void;
}

const CreateSection = ({ onOpenChange }: CreateSectionProps) => {
    const [createSection, { isLoading}] = useCreateSectionMutation()
    const form = useForm<z.infer<typeof sectionSchema>>({
            resolver: zodResolver(sectionSchema),
            defaultValues: {
                type: "",
                section: "",
                year: "",
            },
        })
    
        async function onSubmit(values: z.infer<typeof sectionSchema>) {
            try {
                await createSection(values).unwrap()
                toast('New Room Created Successfully')
                onOpenChange(false);
                form.reset();
            } catch (err: unknown) {
                console.log(err);
            }
        }

  return (
    <DialogContent>
        <DialogTitle>Create Section</DialogTitle>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
                <FormField
                control={form.control}
                name="type"
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
                name="section"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Section</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className='w-full'>
                        <SelectTrigger>
                            <SelectValue placeholder="Select section"/>
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="E">E</SelectItem>
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
                    <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className='w-full'>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Year"/>
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="1st">1st</SelectItem>
                        <SelectItem value="2nd">2nd</SelectItem>
                        <SelectItem value="3rd">3rd</SelectItem>
                        <SelectItem value="4th">4th</SelectItem>
                        <SelectItem value="5th">5th</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className='flex w-full justify-end gap-3'>
                    <DialogClose asChild> 
                        <Button variant={'outline'} className='border-zinc-400 cursor-pointer'>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className='bg-[#0b6602] hover:bg-[#084e02] cursor-pointer'>{isLoading ? 'Creating' : 'Create'}</Button>
                </div>
            </form>
        </Form>
    </DialogContent>
  )
}

export default CreateSection