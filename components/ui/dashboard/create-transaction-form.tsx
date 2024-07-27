'use client';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createTransaction } from '@/lib/actions/mutateTransactions';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Calendar } from '../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

const formSchema = z.object({
  type: z.string(),
  name: z.string().min(1, { message: 'Transaction name is required' }).max(100),
  amount: z
    .string()
    .min(1, { message: 'Transaction amount is required' })
    .max(10, { message: 'Transaction amount is too large' }),
  date: z.date({ required_error: 'Transaction date is required' }),
  time: z
    .string()
    .min(1, { message: 'Transaction time is required' })
    .max(8, { message: 'Transaction time is invalid' }),
});

export default function CreateTransactionForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'Income',
      name: '',
      amount: '',
      date: new Date(),
      time: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('type', values.type);
    formData.append('name', values.name);
    formData.append('amount', values.amount);
    formData.append('date', values.date.toISOString());
    formData.append('time', values.time);

    await createTransaction(formData, userId);

    form.reset();
    window.location.reload();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-row gap-4"
                >
                  <FormItem className="flex gap-2 items-end">
                    <FormControl>
                      <RadioGroupItem
                        value="Income"
                        id="r1"
                      />
                    </FormControl>
                    <FormLabel>Income</FormLabel>
                  </FormItem>
                  <FormItem className="flex gap-2 items-end">
                    <FormControl>
                      <RadioGroupItem
                        value="Expense"
                        id="r2"
                      />
                    </FormControl>
                    <FormLabel>Expense</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input transaction name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input transaction amount (IDR)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'yyyy-MM-dd')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input transaction time (HH:MM:SS)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800"
          >
            Submit
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
