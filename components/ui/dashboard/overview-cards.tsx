import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  getTotalExpenseByMonth,
  getTotalIncomeByMonth,
  getTotalProfitByMonth,
} from '@/lib/data/getTransactions';
import {
  ArrowLeftRightIcon,
  BanknoteIcon,
  CircleDollarSignIcon,
  CreditCardIcon,
} from 'lucide-react';

export default async function OverviewCards({
  transactions,
}: {
  transactions: any;
}) {
  const totalIncomeByMonth = await getTotalIncomeByMonth();
  const totalExpensesByMonth = await getTotalExpenseByMonth();
  const totalProfitByMonth = await getTotalProfitByMonth();

  const totalIncome = totalIncomeByMonth.reduce((acc: number, month: any) => {
    return acc + month.income;
  }, 0);

  const totalExpenses = totalExpensesByMonth.reduce(
    (acc: number, month: any) => {
      return acc + month.expenses;
    },
    0
  );

  const totalProfit = totalProfitByMonth.reduce((acc: number, month: any) => {
    return acc + month.profit;
  }, 0);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 text-base font-normal">
            <ArrowLeftRightIcon className="text-zinc-500" />
            Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{transactions.length}</p>
          <CardDescription>
            Total transactions from the last year
          </CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 text-base font-normal">
            <CircleDollarSignIcon className="text-zinc-500" />
            Profit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl text-green-700 font-bold">
            Rp{totalProfit.toLocaleString('en-US')}
          </p>
          <CardDescription>Total profit from the last year</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 text-base font-normal">
            <BanknoteIcon className="text-zinc-500" />
            Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl text-emerald-700 font-bold">
            Rp{totalIncome.toLocaleString('en-US')}
          </p>
          <CardDescription>Total income from the last year</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 text-base font-normal">
            <CreditCardIcon className="text-zinc-500" />
            Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl text-red-700 font-bold">
            Rp{totalExpenses.toLocaleString('en-US')}
          </p>
          <CardDescription>Total expenses from the last year</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
