import { roomSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DialogClose, DialogContent, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

type CreateRoomProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CreateRoom = ({ open, onOpenChange }: CreateRoomProps) => {
    const form = useForm<z.infer<typeof roomSchema>>({
            resolver: zodResolver(roomSchema),
            defaultValues: {
                name: "",
            },
        })
    
        async function onSubmit(values: z.infer<typeof roomSchema>) {
            console.log(values);
        }

  return (
    <DialogContent>
        <DialogTitle>Create Room</DialogTitle>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Room Name" {...field}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
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

export default CreateRoom