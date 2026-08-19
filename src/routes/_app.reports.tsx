import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Download, SlidersHorizontal } from "lucide-react";

import { StatusBadge } from "@/components/crm/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leads } from "@/data/crm-mock";
import { formatINR, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_app/reports")({
  component: Reports,
});

// Plain native <select> here on purpose — no Radix, no popper/portal —
// this page just needs to look filterable for the prototype, not host
// five live Radix Select instances at once.
function PlainSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">{label}</label>
      <div className="relative">
        <select className="h-9 w-full appearance-none rounded-md border border-input bg-card px-3 pr-8 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

function Reports() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Analytics and detailed data exports for the entire loan lifecycle.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-1.5 h-4 w-4" />
          Export Excel
        </Button>
      </div>
      <Card className="surface-card">
        <CardContent className="space-y-5 p-5">
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <PlainSelect label="Type" options={["Leads", "Applications", "Sanctions", "Disbursements"]} />
              <PlainSelect label="Range" options={["This Month", "Last Month", "Custom Range"]} />
              <PlainSelect label="Status" options={["All Statuses", "Pending", "Done", "Rejected"]} />
              <PlainSelect label="Loan Type" options={["All Loan Types", "Home Loan", "Business Loan"]} />
              <PlainSelect label="Team" options={["All Teams", "Mumbai", "Thane", "Pune"]} />
            </div>
          </div>

          <div className="flex items-center justify-between">
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
    </>
  );
}
