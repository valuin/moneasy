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
            <TableCell>Year</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Profit</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profits.map((profit: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{profit.year}</TableCell>
              <TableCell>{profit.month}</TableCell>
              <TableCell>{profit.profit.toLocaleString('en-US')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
