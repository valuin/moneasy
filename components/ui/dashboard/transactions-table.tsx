import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TransactionsTable({
  transactions,
}: {
  transactions: any;
}) {
  return (
    <div className="bg-white rounded-md border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction: any, index: number) => (
            <TableRow key={transaction.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.time}</TableCell>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>
                Rp{transaction.amount.toLocaleString('en-US')}
              </TableCell>
              <TableCell>{transaction.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
