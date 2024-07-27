'use server';

import { createClient } from "@/utils/supabase/server";

export async function createTransaction(data: FormData) {
  const supabase = createClient();

  const { data: transaction, error } = await supabase
    .from("transactions")
    .insert(data);

  if (error) {
    console.log(error);
    return error;
  }

  return transaction;
}

export async function updateTransaction(id: string, data: any) {
  const supabase = createClient();

  const { data: transaction, error } = await supabase
    .from("transactions")
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
    .from("transactions")
    .delete()
    .match({ id });

  if (error) {
    console.log(error);
    return error;
  }

  return data;
}