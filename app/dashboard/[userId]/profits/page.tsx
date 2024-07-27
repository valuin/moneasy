import ProfitsTable from '@/components/ui/dashboard/profits-table';
import { getTotalProfitByMonth } from '@/lib/data/getTransactions';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default async function Page({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const profits = await getTotalProfitByMonth();

  console.log(profits);

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
          <h1 className="text-2xl font-bold">Profits</h1>
          <p>Here's a list of your profits!</p>
        </div>
      </div>
      <ProfitsTable profits={profits} />
    </>
  );
}
