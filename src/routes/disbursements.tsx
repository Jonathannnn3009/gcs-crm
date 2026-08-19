import { createFileRoute } from "@tanstack/react-router";

import { CrmShell } from "@/components/crm/crm-shell";
import { StatusBadge } from "@/components/crm/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { disbursements } from "@/data/crm-mock";
import { formatINR, formatDate } from "@/lib/format";

export const Route = createFileRoute("/disbursements")({
  component: Disbursements,
});

function Disbursements() {
  return (
    <CrmShell title="Disbursements" description="Track finalised fund transfers.">
      <Card className="surface-card">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Disbursement ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>ROI</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disbursements.map((d) => {
                const pct = Math.round((d.disbursedAmount / d.sanctionedAmount) * 100);
                return (
                  <TableRow key={d.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{d.id}</TableCell>
                    <TableCell className="font-medium text-foreground">{d.applicant}</TableCell>
                    <TableCell>{d.bank}</TableCell>
                    <TableCell className="min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <Progress value={pct} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {formatINR(d.disbursedAmount)} of {formatINR(d.sanctionedAmount)}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      {d.roi}% <span className="text-muted-foreground">({d.roiType})</span>
                    </TableCell>
                    <TableCell>{formatDate(d.date)}</TableCell>
                    <TableCell className="text-right">
                      <StatusBadge status={d.disbursementType} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </CrmShell>
  );
}
