import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeftRightIcon,
  BanknoteIcon,
  CircleDollarSignIcon,
  CreditCardIcon,
} from 'lucide-react';

export default function OverviewCards({ transactions }: { transactions: any }) {
  const totalIncome = 100000;
  const totalExpenses = 50000;
  const totalProfit = totalIncome - totalExpenses;
  
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
            Total transactions from the last 6 months
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
          <p
            className={`text-2xl font-bold ${
              totalIncome > totalExpenses ? 'text-emerald-700' : 'text-red-700'
            }`}
          >
            Rp{totalProfit}
          </p>
          <CardDescription>Total profit from the last 6 months</CardDescription>
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
          <p className="text-2xl text-emerald-700 font-bold">Rp{totalIncome}</p>
          <CardDescription>Total income from the last 6 months</CardDescription>
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
          <p className="text-2xl text-red-700 font-bold">Rp{totalExpenses}</p>
          <CardDescription>
            Total expenses from the last 6 months
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
