import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, FileText, BadgeCheck, Landmark, Wallet } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Pie, PieChart, Cell, XAxis } from "recharts";

import { PageHeader } from "@/components/crm/page-header";
import { StatCard } from "@/components/crm/stat-card";
import { StatusBadge } from "@/components/crm/status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leads, monthlyVolume, loanMix, applications, sanctions, disbursements, commissions } from "@/data/crm-mock";
import { formatINR, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

const volumeConfig = {
  disbursed: { label: "Disbursed (₹ Cr)", color: "var(--brand)" },
} satisfies ChartConfig;

const mixColors = ["var(--brand)", "var(--navy)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--muted-foreground)"];

function Dashboard() {
  const totalCommission = commissions.reduce((s, c) => s + c.totalCommission, 0);

  return (
    <>
      <PageHeader title="Dashboard" description="Business snapshot across every stage of the loan pipeline." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Leads" value={String(leads.length)} icon={Users} trend="+2 this week" />
        <StatCard label="Applications" value={String(applications.length)} icon={FileText} />
        <StatCard label="Sanctions" value={String(sanctions.length)} icon={BadgeCheck} />
        <StatCard label="Disbursements" value={String(disbursements.length)} icon={Landmark} />
        <StatCard label="Commission Files" value={formatINR(totalCommission)} icon={Wallet} tone="navy" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="surface-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Loan pipeline overview</CardTitle>
            <CardDescription>Disbursed volume by month, ₹ Cr</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={volumeConfig} className="aspect-auto h-64 w-full">
              <AreaChart data={monthlyVolume}>
                <defs>
                  <linearGradient id="fillDisbursed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-disbursed)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-disbursed)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeOpacity={0.4} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="disbursed"
                  type="monotone"
                  fill="url(#fillDisbursed)"
                  stroke="var(--color-disbursed)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Loan distribution</CardTitle>
            <CardDescription>By product, current pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="mx-auto aspect-square h-56">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={loanMix} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} strokeWidth={2}>
                  {loanMix.map((entry, i) => (
                    <Cell key={entry.name} fill={mixColors[i % mixColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              {loanMix.map((entry, i) => (
                <li key={entry.name} className="flex items-center gap-1.5 text-muted-foreground">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: mixColors[i % mixColors.length] }}
                  />
                  <span className="truncate">{entry.name}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="surface-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Recent leads</CardTitle>
            <CardDescription>Latest prospects entering the pipeline</CardDescription>
          </div>
          <Link to="/leads" className="text-sm font-medium text-brand hover:underline">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>RO</TableHead>
                <TableHead>Next Meeting</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.slice(0, 5).map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium text-foreground">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.id}</div>
                  </TableCell>
                  <TableCell>{lead.loanType}</TableCell>
                  <TableCell>{formatINR(lead.loanAmount)}</TableCell>
                  <TableCell>{lead.ro}</TableCell>
                  <TableCell>{formatDate(lead.nextMeetingDate)}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={lead.status} />
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
