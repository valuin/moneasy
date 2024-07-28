'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import UpdateTransactionDialog from '@/components/ui/dashboard/update-transaction-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteTransaction } from '@/lib/actions/mutateTransactions';

export default function TransactionsTable({
  transactions,
}: {
  transactions: any;
}) {
  async function handleOnClick(id: string) {
    await deleteTransaction(id);

    window.location.reload();
  }

  return (
    <div className="bg-white rounded-md border p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
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
              <TableCell>
                {transaction.type === 'Income' ? (
                  <Badge className="bg-emerald-500 hover:bg-emerald-400">
                    {transaction.type}
                  </Badge>
                ) : (
                  <Badge variant="destructive">{transaction.type}</Badge>
                )}
              </TableCell>
              <TableCell className="flex gap-2">
                <UpdateTransactionDialog
                  userId={transaction.user_id}
                  transaction={transaction}
                />
                <Button
                  variant="destructive"
                  onClick={async () => handleOnClick(transaction.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
