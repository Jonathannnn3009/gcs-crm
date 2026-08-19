import { createFileRoute } from "@tanstack/react-router";

import { CrmShell } from "@/components/crm/crm-shell";
import { StatusBadge } from "@/components/crm/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { applications } from "@/data/crm-mock";
import { formatINR, formatDate } from "@/lib/format";

export const Route = createFileRoute("/applications")({
  component: Applications,
});

function Applications() {
  return (
    <CrmShell title="Applications" description="Manage underwriting workflows and file statuses.">
      <Card className="surface-card">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Login Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{a.id}</TableCell>
                  <TableCell className="font-medium text-foreground">{a.applicant}</TableCell>
                  <TableCell>{a.loanType}</TableCell>
                  <TableCell>{a.bank}</TableCell>
                  <TableCell>{formatINR(a.loanAmount)}</TableCell>
                  <TableCell>{formatDate(a.loginDate)}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={a.status} />
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
