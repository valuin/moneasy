import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UpdateTransactionForm from '@/components/ui/dashboard/update-transaction-form';

export default function CreateTransactionDialog({
  userId,
  transaction,
}: {
  userId: string;
  transaction: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit transaction</DialogTitle>
          <DialogDescription>Modify this transaction.</DialogDescription>
        </DialogHeader>
        <UpdateTransactionForm
          user_id={userId}
          transaction={transaction}
        />
      </DialogContent>
    </Dialog>
  );
}
