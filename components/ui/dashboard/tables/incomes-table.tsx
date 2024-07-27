import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function IncomesTable({ incomes }: { incomes: any }) {
  return (
    <div className="bg-white rounded-md border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((income: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{income.date}</TableCell>
              <TableCell>{income.name}</TableCell>
              <TableCell>Rp{income.amount.toLocaleString('en-US')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
