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
  userId,
}: {
  transactions: any;
  userId: string;
}) {
  const totalIncomeByMonth = await getTotalIncomeByMonth(userId);
  const totalExpensesByMonth = await getTotalExpenseByMonth(userId);
  const totalProfitByMonth = await getTotalProfitByMonth(userId);

  const totalIncome = totalIncomeByMonth.reduce((acc: number, data: any) => {
    return acc + data.income;
  }, 0);

  const totalExpenses = totalExpensesByMonth.reduce(
    (acc: number, data: any) => {
      return acc + data.expenses;
    },
    0
  );

  const totalProfit = totalProfitByMonth.reduce((acc: number, data: any) => {
    return acc + data.profit;
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
          <CardDescription>Total transactions this year</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 text-base font-normal">
            <CircleDollarSignIcon className="text-zinc-500" />
            Profits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl text-green-700 font-bold">
            {totalProfit < 0
              ? `-Rp${Math.abs(totalProfit).toLocaleString('en-US')}`
              : `Rp${totalProfit.toLocaleString('en-US')}`}
          </p>
          <CardDescription>Total profits this year</CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row gap-4 text-base font-normal">
            <BanknoteIcon className="text-zinc-500" />
            Incomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl text-emerald-700 font-bold">
            Rp{totalIncome.toLocaleString('en-US')}
          </p>
          <CardDescription>Total incomes this year</CardDescription>
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
          <CardDescription>Total expenses this year</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
