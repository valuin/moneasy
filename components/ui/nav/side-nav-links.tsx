'use client';

import {
  ArrowRightLeftIcon,
  BanknoteIcon,
  CircleDollarSignIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  SparklesIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card } from '../card';

export default function SideNavLinks(user: { id: string }) {
  const pathname = usePathname();

  return (
    <Card>
      <nav className='p-4'>
        <ul className="flex flex-col gap-2 text-zinc-500">
          <Link
            className={`flex gap-2 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
              pathname === `/dashboard/${user?.id}`
                ? 'bg-emerald-50 text-emerald-700'
                : ''
            }`}
            href={`/dashboard/${user?.id}`}
          >
            <LayoutDashboardIcon className="w-6 h-6" />
            Dashboard
          </Link>
          <Link
            className={`flex gap-2 ml-8 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
              pathname === `/dashboard/${user?.id}/transactions`
                ? 'bg-emerald-50 text-emerald-700'
                : ''
            }`}
            href={`/dashboard/${user?.id}/transactions`}
          >
            <ArrowRightLeftIcon className="w-6 h-6" />
            Transactions
          </Link>
          <Link
            className={`flex gap-2 ml-8 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
              pathname === `/dashboard/${user?.id}/profits`
                ? 'bg-emerald-50 text-emerald-700'
                : ''
            }`}
            href={`/dashboard/${user?.id}/profits`}
          >
            <CircleDollarSignIcon className="w-6 h-6" />
            Profits
          </Link>
          <Link
            className={`flex gap-2 ml-8 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
              pathname === `/dashboard/${user?.id}/income`
                ? 'bg-emerald-50 text-emerald-700'
                : ''
            }`}
            href={`/dashboard/${user?.id}/incomes`}
          >
            <BanknoteIcon className="w-6 h-6" />
            Incomes
          </Link>
          <Link
            className={`flex gap-2 ml-8 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
              pathname === `/dashboard/${user?.id}/expenses`
                ? 'bg-emerald-50 text-emerald-700'
                : ''
            }`}
            href={`/dashboard/${user?.id}/expenses`}
          >
            <CreditCardIcon className="w-6 h-6" />
            Expenses
          </Link>
          <Link
            className={`flex gap-2 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
              pathname === `/dashboard/${user?.id}/ai-chat`
                ? 'bg-emerald-50 text-emerald-700'
                : ''
            }`}
            href={`/dashboard/${user?.id}/ai-chat`}
          >
            <SparklesIcon className="w-6 h-6" />
            Chat With AI
          </Link>
        </ul>
      </nav>
    </Card>
  );
}
