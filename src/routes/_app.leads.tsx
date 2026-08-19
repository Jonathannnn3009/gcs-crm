import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { NewLeadDialog } from "@/components/crm/new-lead-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leads as initialLeads, type Lead } from "@/data/crm-mock";
import { formatINR, formatDate } from "@/lib/format";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_app/leads")({
  component: Leads,
});

function Leads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [query, setQuery] = useState("");

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.contact.includes(query) ||
      l.id.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Leads"
        description="Source, track and manage all prospective loans."
        action={<NewLeadDialog onCreate={(lead) => setLeads((prev) => [lead, ...prev])} />}
      />
      <Card className="surface-card">
        <CardContent className="p-4">
          <div className="relative mb-4 max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or contact number"
              className="pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead ID</TableHead>
                <TableHead>Lead Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>RO / SM</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Next Meeting</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{lead.id}</TableCell>
                  <TableCell>{formatDate(lead.date)}</TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.contact}</div>
                  </TableCell>
                  <TableCell>{lead.loanType}</TableCell>
                  <TableCell>{formatINR(lead.loanAmount)}</TableCell>
                  <TableCell className="text-xs">
                    {lead.ro}
                    <span className="text-muted-foreground"> / {lead.sm}</span>
                  </TableCell>
                  <TableCell className="text-xs">
                    {lead.referenceType === "Self" ? "Self" : lead.referenceName}
                  </TableCell>
                  <TableCell>{formatDate(lead.nextMeetingDate)}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={lead.status} />
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-10 text-center text-sm text-muted-foreground">
                    No leads found.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
