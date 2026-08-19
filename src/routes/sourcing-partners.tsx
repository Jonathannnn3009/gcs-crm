import { createFileRoute } from "@tanstack/react-router";

import { CrmShell } from "@/components/crm/crm-shell";
import { StatusBadge } from "@/components/crm/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { sourcingPartners } from "@/data/crm-mock";
import { formatDate } from "@/lib/format";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/sourcing-partners")({
  component: SourcingPartners,
});

function SourcingPartners() {
  return (
    <CrmShell
      title="Sourcing Partners"
      description="External referral partners who bring in leads."
      action={
        <Button className="bg-brand text-brand-foreground hover:bg-brand/90">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Partner
        </Button>
      }
    >
      <Card className="surface-card">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Reports To</TableHead>
                <TableHead>Commission %</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sourcingPartners.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                  <TableCell className="text-xs">
                    <div>{p.email}</div>
                    <div className="text-muted-foreground">{p.phone}</div>
                  </TableCell>
                  <TableCell>{p.reportsTo}</TableCell>
                  <TableCell>{p.commissionPct}%</TableCell>
                  <TableCell>{formatDate(p.joiningDate)}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={p.status} />
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
