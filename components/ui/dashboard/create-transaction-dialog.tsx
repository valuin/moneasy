import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';

import CreateTransactionForm from '@/components/ui/dashboard/create-transaction-form';

export default function CreateTransactionDialog({ userId }: { userId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-emerald-700 hover:bg-emerald-800 flex gap-2">
          <PlusIcon />
          Add transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add transaction</DialogTitle>
          <DialogDescription>Enter details below.</DialogDescription>
        </DialogHeader>
        <CreateTransactionForm userId={userId} />
      </DialogContent>
    </Dialog>
  );
}
