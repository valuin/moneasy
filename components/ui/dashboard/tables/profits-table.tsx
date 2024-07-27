import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ProfitsTable({ profits }: { profits: any }) {
  return (
    <div className="bg-white rounded-md border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Income</TableCell>
            <TableCell>Expense</TableCell>
            <TableCell>Profit</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profits.map((profit: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{profit.date}</TableCell>
              <TableCell>Rp{profit.income.toLocaleString('en-US')}</TableCell>
              <TableCell>Rp{profit.expense.toLocaleString('en-US')}</TableCell>
              <TableCell>
                {profit.profit < 0
                  ? `-Rp${Math.abs(profit.profit).toLocaleString('en-US')}`
                  : `Rp${profit.profit.toLocaleString('en-US')}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
