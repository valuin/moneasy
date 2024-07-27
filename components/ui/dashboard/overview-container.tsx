import OverviewCards from '@/components/ui/dashboard/overview-cards';
import { CashFlowChart } from '@/components/ui/cash-flow-chart';
import { getTransactions } from '@/lib/data/getTransactions';

export default async function OverviewContainer() {
  const transactions = await getTransactions();

  return (
    <div className="bg-white border rounded-lg p-8 flex flex-col gap-4">
      <CashFlowChart chartData={transactions} />
      <OverviewCards transactions={transactions} />
    </div>
  );
}
