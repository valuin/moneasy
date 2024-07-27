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

export default function SideNavLinks(user: { id: string }) {
  const pathname = usePathname();

  return (
    <nav className="border border-zinc-300 rounded-lg p-4">
      <ul className="flex flex-col gap-2">
        <Link
          className={`flex gap-2 text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
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
          className={`flex gap-2 text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
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
          className={`flex gap-2 text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
            pathname === `/dashboard/${user?.id}/profit`
              ? 'bg-emerald-50 text-emerald-700'
              : ''
          }`}
          href={`/dashboard/${user?.id}/profit`}
        >
          <CircleDollarSignIcon className="w-6 h-6" />
          Profit
        </Link>
        <Link
          className={`flex gap-2 text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
            pathname === `/dashboard/${user?.id}/income`
              ? 'bg-emerald-50 text-emerald-700'
              : ''
          }`}
          href={`/dashboard/${user?.id}/income`}
        >
          <BanknoteIcon className="w-6 h-6" />
          Income
        </Link>
        <Link
          className={`flex gap-2 text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
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
          className={`flex gap-2 text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg p-2 ${
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
  );
}