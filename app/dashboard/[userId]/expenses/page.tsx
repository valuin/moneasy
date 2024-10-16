import ExpensesTable from '@/components/ui/dashboard/tables/expenses-table';
import { getTotalExpenseForTable } from '@/lib/data/getTransactions';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Page({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const expenses = await getTotalExpenseForTable(userId);

  return (
    <>
      <div className="flex gap-4 items-start">
        <Link
          href={`/dashboard/${userId}`}
          className="text-white p-1"
        >
          <ArrowLeftIcon />
        </Link>
        <div className="flex flex-col text-white">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p>Here's a list of your expenses!</p>
        </div>
      </div>
      <ExpensesTable expenses={expenses.reverse()} />
    </>
  );
}
