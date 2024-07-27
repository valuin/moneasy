'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PostgrestError } from '@supabase/postgrest-js';
import { getTransactions } from '@/lib/data/getTransactions';
import { updateTransaction } from '@/lib/actions/Transactions';

const TestFormPage = () => {
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);

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
      setTransactions(result as any[]);
      setError(null);
    } catch (err) {
      console.error('Fetch transactions error:', err);
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingTransaction({ ...transactions[index] });
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingTransaction(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setEditingTransaction({ ...editingTransaction, [field]: e.target.value });
  };

  const saveEdit = async () => {
    if (editingIndex !== null && editingTransaction) {
      setLoading(true);
      try {
        await updateTransaction(editingTransaction.id, editingTransaction);
        const newTransactions = [...transactions];
        newTransactions[editingIndex] = editingTransaction;
        setTransactions(newTransactions);
        setError(null);
      } catch (err) {
        console.error('Update transaction error:', err);
        setError(err as PostgrestError);
      } finally {
        setLoading(false);
        cancelEditing();
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error text-red-500">{error.message}</div>}
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 px-4 py-2">Name</th>
            <th className="w-1/6 px-4 py-2">Amount</th>
            <th className="w-1/6 px-4 py-2">Date</th>
            <th className="w-1/6 px-4 py-2">Time</th>
            <th className="w-1/6 px-4 py-2">Type</th>
            <th className="w-1/6 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-t">
              {editingIndex === index ? (
                <>
                  <td className="px-4 py-2">
                    <input 
                      type="text"
                      value={editingTransaction.name}
                      onChange={(e) => handleChange(e, 'name')}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input 
                      type="text"
                      value={editingTransaction.amount}
                      onChange={(e) => handleChange(e, 'amount')}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input 
                      type="text"
                      value={editingTransaction.date}
                      onChange={(e) => handleChange(e, 'date')}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input 
                      type="text"
                      value={editingTransaction.time}
                      onChange={(e) => handleChange(e, 'time')}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input 
                      type="text"
                      value={editingTransaction.type}
                      onChange={(e) => handleChange(e, 'type')}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button onClick={saveEdit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">Save</button>
                    <button onClick={cancelEditing} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2">{transaction.name}</td>
                  <td className="px-4 py-2">{transaction.amount}</td>
                  <td className="px-4 py-2">{transaction.date}</td>
                  <td className="px-4 py-2">{transaction.time}</td>
                  <td className="px-4 py-2">{transaction.type}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => startEditing(index)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={fetchTransactions} className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
        Refresh Transactions
      </button>
    </div>
  );
};

export default TestFormPage;