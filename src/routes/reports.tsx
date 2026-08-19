import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

import { CrmShell } from "@/components/crm/crm-shell";
import { StatusBadge } from "@/components/crm/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leads } from "@/data/crm-mock";
import { formatINR, formatDate } from "@/lib/format";

export const Route = createFileRoute("/reports")({
  component: Reports,
});

function Reports() {
  return (
    <CrmShell
      title="Reports"
      description="Analytics and detailed data exports for the entire loan lifecycle."
      action={
        <Button variant="outline">
          <Download className="mr-1.5 h-4 w-4" />
          Export Excel
        </Button>
      }
    >
      <Card className="surface-card">
        <CardContent className="p-4">
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            <Select defaultValue="leads">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="applications">Applications</SelectItem>
                <SelectItem value="sanctions">Sanctions</SelectItem>
                <SelectItem value="disbursements">Disbursements</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="this-month">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Loan Types</SelectItem>
                <SelectItem value="home">Home Loan</SelectItem>
                <SelectItem value="business">Business Loan</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="thane">Thane</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Leads</span>
            <span className="text-xs text-muted-foreground">Showing {leads.length} of {leads.length} records</span>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead ID</TableHead>
                <TableHead>Lead Date</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{l.id}</TableCell>
                  <TableCell>{formatDate(l.date)}</TableCell>
                  <TableCell className="font-medium text-foreground">{l.name}</TableCell>
                  <TableCell>{l.contact}</TableCell>
                  <TableCell>{l.loanType}</TableCell>
                  <TableCell>{formatINR(l.loanAmount)}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={l.status} />
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
