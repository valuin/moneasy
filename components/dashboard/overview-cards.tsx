import {
  ArrowLeftRightIcon,
  BanknoteIcon,
  CircleDollarSignIcon,
  CreditCardIcon,
} from 'lucide-react';
import { Card, CardHeader } from '../ui/card';
import { useState } from 'react';

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex-row gap-4">
          <ArrowLeftRightIcon className="text-zinc-500" />
          Transactions
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex-row gap-4">
          <CircleDollarSignIcon className="text-zinc-500" />
          Profit
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex-row gap-4">
          <BanknoteIcon className="text-zinc-500" />
          Income
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex-row gap-4">
          <CreditCardIcon className="text-zinc-500" />
          Expenses
        </CardHeader>
      </Card>
    </div>
  );
}
