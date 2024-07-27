'use server';

import { createClient } from "@/utils/supabase/server";

export async function getTransactions() {
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

export async function getTransactionsByMonth() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('transactions')
    .select('*');

  if (error) {
    console.log(error);
    return error;
  }

  const categorizedTransactions: Record<string, Record<string, any[]>> = {};

  data.forEach((transaction: any) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });

    if (!categorizedTransactions[year]) {
      categorizedTransactions[year] = {};
    }

    if (!categorizedTransactions[year][month]) {
      categorizedTransactions[year][month] = [];
    }

    categorizedTransactions[year][month].push(transaction);
  });

  return categorizedTransactions;
}