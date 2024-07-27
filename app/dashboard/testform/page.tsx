'use client';

import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/postgrest-js';
import { getTransactions } from '@/lib/data/getTransactions';
import { updateTransaction, createTransaction, deleteTransaction } from '@/lib/actions/mutateTransactions';

const TestFormPage = () => {
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newTransaction, setNewTransaction] = useState<any>({
    name: '',
    amount: '',
    date: '',
    time: '',
    type: ''
  });

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

  const handleChangeNew = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewTransaction({ ...newTransaction, [field]: e.target.value });
  };

  const createNewTransaction = async () => {
    setLoading(true);
    try {
      const createdTransaction = await createTransaction(newTransaction);
      setTransactions([...transactions, createdTransaction]);
      setNewTransaction({
        name: '',
        amount: '',
        date: '',
        time: '',
        type: ''
      });
      setError(null);
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Create transaction error:', err);
      setError(err as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  const startDeleting = async (index: number) => {
    setLoading(true);
    try {
      await deleteTransaction(transactions[index].id);
      const newTransactions = transactions.filter((_, i) => i !== index);
      setTransactions(newTransactions);
      setError(null);
    } catch (err) {
      console.error('Delete transaction error:', err);
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
                  <td className="px-4 py-2 flex">
                    <button onClick={() => startEditing(index)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">Edit</button>
                    <button onClick={() => startDeleting(index)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setIsDialogOpen(true)} className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700">
        Add Transaction
      </button>
      <button onClick={fetchTransactions} className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 ml-2">
        Refresh Transactions
      </button>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Transaction</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newTransaction.name}
                onChange={(e) => handleChangeNew(e, 'name')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => handleChangeNew(e, 'amount')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Date"
                value={newTransaction.date}
                onChange={(e) => handleChangeNew(e, 'date')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Time"
                value={newTransaction.time}
                onChange={(e) => handleChangeNew(e, 'time')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Type"
                value={newTransaction.type}
                onChange={(e) => handleChangeNew(e, 'type')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={createNewTransaction} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">Create</button>
              <button onClick={() => setIsDialogOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestFormPage;