'use server';

import { createClient } from '@/utils/supabase/server';

export async function getTransactions(userId: string): Promise<any> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.log(error);
    return error;
  }

  return data;
}

export async function getTransactionsByMonth(userId: string): Promise<any> {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId);

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

  const transactionsArray: any[] = [];

  for (const year in categorizedTransactions) {
    for (const month in categorizedTransactions[year]) {
      transactionsArray.push({
        year: year,
        month: month,
        transactions: categorizedTransactions[year][month],
      });
    }
  }

  transactionsArray.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months.indexOf(b.month) - months.indexOf(a.month);
  });

  return transactionsArray;
}

export async function getTotalProfitByMonth(userId: string): Promise<any> {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId);

  if (error) {
    console.error('Error fetching transactions:', error);
    return error;
  }

  interface TransactionRecord {
    year: number;
    month: string;
    profit: number;
  }

  const categorizedTransactions: Record<string, TransactionRecord> = {};

  data.forEach((transaction: any) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const yearMonthKey = `${year}-${month}`;

    if (!categorizedTransactions[yearMonthKey]) {
      categorizedTransactions[yearMonthKey] = {
        year: year,
        month: month,
        profit: 0,
      };
    }

    if (transaction.type === 'Income') {
      categorizedTransactions[yearMonthKey].profit += transaction.amount;
    } else if (transaction.type === 'Expense') {
      categorizedTransactions[yearMonthKey].profit -= transaction.amount;
    }
  });

  const totalProfitArray: any[] = [];

  for (const key in categorizedTransactions) {
    totalProfitArray.push(categorizedTransactions[key]);
  }

  return totalProfitArray;
}

export async function getTotalProfitForTable(userId: string): Promise<any> {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*').order('date', { ascending: false }).eq('user_id', userId);

  if (error) {
    console.error('Error fetching transactions:', error);
    return error;
  }

  interface DailyProfit {
    date: string;
    income: number;
    expense: number;
    profit: number;
    transactions: Array<{
      id: string;
      name: string;
      type: string;
      amount: number;
      time: string;
    }>;
  }

  const dailyProfits: Record<string, DailyProfit> = {};

  data.forEach((transaction: any) => {
    const date = new Date(transaction.date);
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format

    if (!dailyProfits[dateKey]) {
      dailyProfits[dateKey] = {
        date: dateKey,
        income: 0,
        expense: 0,
        profit: 0,
        transactions: [],
      };
    }

    const amount = Number(transaction.amount);
    if (transaction.type === 'Income') {
      dailyProfits[dateKey].income += amount;
    } else if (transaction.type === 'Expense') {
      dailyProfits[dateKey].expense += amount;
    }

    dailyProfits[dateKey].profit = dailyProfits[dateKey].income - dailyProfits[dateKey].expense;

    dailyProfits[dateKey].transactions.push({
      id: transaction.id,
      name: transaction.name,
      type: transaction.type,
      amount: amount,
      time: date.toLocaleTimeString(),
    });
  });

  // Convert the object to an array and sort by date (most recent first)
  const sortedDailyProfits = Object.values(dailyProfits).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sortedDailyProfits;
}

export async function getTotalIncomeByMonth(userId: string): Promise<any> {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId);

  if (error) {
    console.error('Error fetching transactions:', error);
    return error;
  }

  interface TransactionRecord {
    year: number;
    month: string;
    income: number;
  }

  const categorizedTransactions: Record<string, TransactionRecord> = {};

  data.forEach((transaction: any) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const yearMonthKey = `${year}-${month}`;

    if (!categorizedTransactions[yearMonthKey]) {
      categorizedTransactions[yearMonthKey] = {
        year: year,
        month: month,
        income: 0,
      };
    }

    if (transaction.type === 'Income') {
      categorizedTransactions[yearMonthKey].income += transaction.amount;
    }
  });

  const totalIncomeArray: any[] = [];

  for (const key in categorizedTransactions) {
    totalIncomeArray.push(categorizedTransactions[key]);
  }

  return totalIncomeArray;
}

export async function getTotalIncomeForTable(userId: string): Promise<any> {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId);

  if (error) {
    console.error('Error fetching transactions:', error);
    return error;
  }

  // Filter out transactions with type 'Expense'
  const filteredTransactions = data.filter((transaction: any) => {
    return transaction.type === 'Income';
  });

  // sort transactions by date
  filteredTransactions.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return filteredTransactions;
}

export async function getTotalExpenseByMonth(userId: string): Promise<any> {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId);

  if (error) {
    console.error('Error fetching transactions:', error);
    return error;
  }

  interface TransactionRecord {
    year: number;
    month: string;
    expenses: number;
  }

  const categorizedTransactions: Record<string, TransactionRecord> = {};

  data.forEach((transaction: any) => {
    const date = new Date(transaction.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const yearMonthKey = `${year}-${month}`;

    if (!categorizedTransactions[yearMonthKey]) {
      categorizedTransactions[yearMonthKey] = {
        year: year,
        month: month,
        expenses: 0,
      };
    }

    if (transaction.type === 'Expense') {
      categorizedTransactions[yearMonthKey].expenses += transaction.amount;
    }
  });

  const totalExpenseArray: any[] = [];

  for (const key in categorizedTransactions) {
    totalExpenseArray.push(categorizedTransactions[key]);
  }

  return totalExpenseArray;
}

export async function getTotalExpenseForTable(userId: string): Promise<any> {
  const supabase = createClient();

  const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId);

  if (error) {
    console.error('Error fetching transactions:', error);
    return error;
  }

  // Filter out transactions with type 'Income'
  const filteredTransactions = data.filter((transaction: any) => {
    return transaction.type === 'Expense';
  });

  // sort transactions by date
  filteredTransactions.sort((a: any, b: any) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return filteredTransactions;
}
