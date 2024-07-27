'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PostgrestError } from '@supabase/postgrest-js';
import getTransactions from '@/lib/actions/getTransactions';

const TestFormPage = () => {
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[]>([]); // Adjust the type of transactions as needed


  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const result = await getTransactions();
      if ((result as PostgrestError)?.message) {
        throw result;
      }
      setTransactions(result as any[]); // Assuming getTransactions returns an array
      setError(null);
    } catch (err) {
      console.error('Fetch transactions error:', err);
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error text-red-500">{error.message}</div>}
      <ul className="space-y-4">
        {transactions.map((transaction, index) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow-md">
            <div className="font-bold text-emerald-500">{transaction.name}</div>
            <div>{transaction.amount}</div>
            <div>{transaction.date}</div>
            <div>{transaction.time}</div>
            <div>{transaction.type}</div>
          </li>
        ))}
      </ul>
      <button onClick={fetchTransactions} className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
        Refresh Transactions
      </button>
    </div>
  );
};

export default TestFormPage;