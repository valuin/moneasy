'use server';

import { createClient } from "@/utils/supabase/server";

export async function getTransactions(): Promise<any> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select("*");

  if (error) {
    console.log(error);
    return error;
  }

  return data;
}