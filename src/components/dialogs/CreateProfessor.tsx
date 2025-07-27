import { acadRank, professorSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DialogClose, DialogContent, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

type CreateProfessorProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CreateProfessor = ({ open, onOpenChange }: CreateProfessorProps) => {
    const form = useForm<z.infer<typeof professorSchema>>({
            resolver: zodResolver(professorSchema),
            defaultValues: {
                firstName: "",
                lastName: "",
                middleInitial: "",
                acadRank: ""
            },
        })
    
        async function onSubmit(values: z.infer<typeof professorSchema>) {
            console.log(values);
        }

  return (
    <DialogContent>
        <DialogTitle>Create Professor</DialogTitle>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-5">
                <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                        <Input placeholder="First Name" {...field}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Last Name" {...field}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="middleInitial"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>M.I</FormLabel>
                    <FormControl>
                        <Input placeholder="Middle Initial" {...field}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="acadRank"
                render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                    <FormLabel>Academic Rank</FormLabel>
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
                                ? acadRank.find(
                                    (rank) => rank.value === field.value
                                )?.label
                                : "Select rank"}
                            <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput
                            placeholder="Search rank..."
                            className="h-9 w-full"
                            />
                            <CommandList>
                            <CommandEmpty>No rank found.</CommandEmpty>
                            <CommandGroup>
                                {acadRank.map((rank) => (
                                <CommandItem
                                    value={rank.label}
                                    key={rank.value}
                                    onSelect={() => {
                                    form.setValue("acadRank", rank.value)
                                    }}
                                >
                                    {rank.label}
                                    <Check
                                    className={cn(
                                        "ml-auto",
                                        rank.value === field.value
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
                    <Button type="submit" className='bg-[#0b6602] hover:bg-[#084e02] cursor-pointer'>Create</Button>
                </div>
            </form>
        </Form>
    </DialogContent>
  )
}

export default CreateProfessor