'use server';

import { createClient } from "@/utils/supabase/server";

export default async function getTransactions() {
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