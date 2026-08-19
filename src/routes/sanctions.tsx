import { createFileRoute } from "@tanstack/react-router";

import { CrmShell } from "@/components/crm/crm-shell";
import { StatusBadge } from "@/components/crm/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { sanctions } from "@/data/crm-mock";
import { formatINR, formatDate } from "@/lib/format";

export const Route = createFileRoute("/sanctions")({
  component: Sanctions,
});

function Sanctions() {
  return (
    <CrmShell title="Sanctions" description="Review and finalise loan sanctions.">
      <Card className="surface-card">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sanction ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Sanctioned Amount</TableHead>
                <TableHead>Technical Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Financial Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sanctions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{s.id}</TableCell>
                  <TableCell className="font-medium text-foreground">{s.applicant}</TableCell>
                  <TableCell>{s.bank}</TableCell>
                  <TableCell>{formatINR(s.loanAmount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={s.technicalStatus} />
                  </TableCell>
                  <TableCell>{formatDate(s.sanctionDate)}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={s.financialStatus} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </CrmShell>
  );
}
