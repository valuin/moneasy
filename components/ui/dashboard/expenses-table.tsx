import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ExpensesTable({ expenses }: { expenses: any }) {
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
          {expenses.map((expense: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.name}</TableCell>
              <TableCell>Rp{expense.amount.toLocaleString('en-US')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
