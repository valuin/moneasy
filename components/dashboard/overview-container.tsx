import OverviewCards from '@/components/dashboard/overview-cards';
import { CashFlowChart } from '@/components/ui/cash-flow-chart';

export default function OverviewContainer() {
  return (
    <div className="bg-white border rounded-lg p-8 flex flex-col gap-4">
      <CashFlowChart />
      <OverviewCards />
    </div>
  );
}
