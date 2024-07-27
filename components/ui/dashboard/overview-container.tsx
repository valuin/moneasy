import { CashFlowChart } from '@/components/ui/cash-flow-chart';
import OverviewCards from '@/components/ui/dashboard/overview-cards';
import { getTransactions, getTransactionsByMonth } from '@/lib/data/getTransactions';
import AIEvaluation from './ai-evaluation';

export default async function OverviewContainer() {
  const transactions = await getTransactions();
  const transactionsByMonth = await getTransactionsByMonth();

  const date = new Date();
  const currentYear = date.getFullYear().toString();

  const chartData = transactionsByMonth.map((monthData: any) => {
    if (monthData.year === currentYear) {
      const month = `${monthData.month} ${monthData.year}`;

      const { income, expenses } = monthData.transactions.reduce(
        (acc: any, transaction: any) => {
          if (transaction.type === 'Income') {
            acc.income += transaction.amount;
          } else if (transaction.type === 'Expense') {
            acc.expenses += transaction.amount;
          }
          return acc;
        },
        { income: 0, expenses: 0 }
      );

      return { month, income, expenses };
    }
  });

  return (
    <div className="bg-white border rounded-lg p-8 flex flex-col gap-4">
      <CashFlowChart chartData={chartData.reverse()} />
      <OverviewCards transactions={transactions} />
      <AIEvaluation />
    </div>
  );
}
