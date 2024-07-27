'use server';

import { createClient } from "@/utils/supabase/server";

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