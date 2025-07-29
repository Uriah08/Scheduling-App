'use client'

import { roomSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DialogClose, DialogContent, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useCreateRoomMutation } from '@/store/api';
import { toast } from 'sonner';

type CreateRoomProps = {
    onOpenChange: (open: boolean) => void;
}

const CreateRoom = ({ onOpenChange }: CreateRoomProps) => {
    const [createRoom, { isLoading }] = useCreateRoomMutation()
    const form = useForm<z.infer<typeof roomSchema>>({
            resolver: zodResolver(roomSchema),
            defaultValues: {
                name: "",
            },
        })
    
        async function onSubmit(values: z.infer<typeof roomSchema>) {
            try {
                await createRoom(values).unwrap()
                toast('New Room Created Successfully')
                onOpenChange(false);
                form.reset();
            } catch (err: unknown) {
                console.log(err);
                
            }
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
                    <Button type="submit" className='bg-[#0b6602] hover:bg-[#084e02] cursor-pointer'>{isLoading ? 'Creating' : 'Create'}</Button>
                </div>
            </form>
        </Form>
    </DialogContent>
  )
}

export default CreateRoom