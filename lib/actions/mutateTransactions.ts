'use server';

import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const TransactionSchema = z.object({
  id: z.string(),
  userId : z.string(),
  type: z.string(),
  name: z.string(),
  amount: z.number(),
  date: z.date(),
  time: z.string(),
});

const CreateTransaction = TransactionSchema.omit({ id: true });

export async function createTransaction(formData: FormData, userId: string) {
  const supabase = createClient();

  const validatedFields = CreateTransaction.safeParse({
    userId,
    name: formData.get('name'),
    type: formData.get('type'),
    amount: Number(formData.get('amount')),
    date: new Date(formData.get('date') as string),
    time: formData.get('time'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors,
      message: 'Failed to Create Transaction',
    };
  }

  const { name, type, amount, date, time } = validatedFields.data;

  try {
    const { error } = await supabase.from('transactions').insert([
      {
        userId,
        name,
        type,
        amount,
        date: format(date, 'yyyy-MM-dd'),
        time,
      },
    ]);

    if (error) {
      throw error;
    }

  } catch (error) {
    console.error('Failed to Create Transaction:', error);
    return {
      message: 'Failed to Create Transaction',
      error,
    };
  }
}

export async function updateTransaction(id: string, data: any) {
  const supabase = createClient();

  const { data: transaction, error } = await supabase
    .from('transactions')
    .update(data)
    .match({ id });

  if (error) {
    console.log(error);
    return error;
  }

  return transaction;
}

export async function deleteTransaction(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('transactions')
    .delete()
    .match({ id });

  if (error) {
    console.log(error);
    return error;
  }

  return data;
}
