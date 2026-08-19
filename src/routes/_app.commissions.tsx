import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { commissions } from "@/data/crm-mock";
import { formatINR, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_app/commissions")({
  component: Commissions,
});

function Commissions() {
  const totalCommission = commissions.reduce((s, c) => s + c.totalCommission, 0);
  const totalRemaining = commissions.reduce((s, c) => s + c.remaining, 0);

  return (
    <>
      <PageHeader title="Commissions" description="Payout breakdown and status tracking." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="surface-card">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Total Commission (Sum of All Payouts)
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{formatINR(totalCommission)}</p>
          </CardContent>
        </Card>
        <Card className="surface-card">
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Net Commission (Remaining)
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{formatINR(totalRemaining)}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="surface-card">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commission Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Total Commission</TableHead>
                <TableHead>Paid Out</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead className="text-right">Payout Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{formatDate(c.payoutDate)}</TableCell>
                  <TableCell className="font-medium text-foreground">{c.applicant}</TableCell>
                  <TableCell>{c.bank}</TableCell>
                  <TableCell>{formatINR(c.totalCommission)}</TableCell>
                  <TableCell>{formatINR(c.paidOut)}</TableCell>
                  <TableCell>{formatINR(c.remaining)}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={c.payoutStatus} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
