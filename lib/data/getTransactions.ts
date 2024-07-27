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

  return JSON.stringify(categorizedTransactions) 
}

export async function getTotalProfitByMonth() {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*');

  if (error) {
    console.error('Error fetching transactions:', error);
    return error;
  }

  const categorizedTransactions: Record<string, number> = {};

  data.forEach((transaction: any) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const yearMonthKey = `${year}-${month}`;

    if (!categorizedTransactions[yearMonthKey]) {
      categorizedTransactions[yearMonthKey] = 0;
    }

    if (transaction.type === 'Income') {
      categorizedTransactions[yearMonthKey] += transaction.amount;
    } else if (transaction.type === 'Expense') {
      categorizedTransactions[yearMonthKey] -= transaction.amount;
    }
  });

  return categorizedTransactions;
}

export async function getTotalIncomeByMonth() {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*');

  if (error) {
    console.error('Error fetching transactions:', error);
    return error;
  }

  const categorizedTransactions: Record<string, number> = {};

  data.forEach((transaction: any) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const yearMonthKey = `${year}-${month}`;

    if (!categorizedTransactions[yearMonthKey]) {
      categorizedTransactions[yearMonthKey] = 0;
    }

    if (transaction.type === 'Income') {
      categorizedTransactions[yearMonthKey] += transaction.amount;
    }
  });

  return categorizedTransactions;
}

export async function getTotalExpenseByMonth() {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*');

  if (error) {
    console.error('Error fetching transactions:', error);
    return error;
  }

  const categorizedTransactions: Record<string, number> = {};

  data.forEach((transaction: any) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const yearMonthKey = `${year}-${month}`;

    if (!categorizedTransactions[yearMonthKey]) {
      categorizedTransactions[yearMonthKey] = 0;
    }

    if (transaction.type === 'Expense') {
      categorizedTransactions[yearMonthKey] += transaction.amount;
    }
  });

  return categorizedTransactions;
}