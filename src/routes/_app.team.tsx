import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/crm/page-header";
import { StatusBadge } from "@/components/crm/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { team } from "@/data/crm-mock";
import { initials } from "@/lib/format";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_app/team")({
  component: Team,
});

function Team() {
  return (
    <>
      <PageHeader
        title="Team"
        description="Manage internal staff and role-based access."
        action={
          <Button className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Staff
          </Button>
        }
      />
      <Card className="surface-card">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                          {initials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">
                    <div>{member.email}</div>
                    <div className="text-muted-foreground">{member.phone}</div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.city}</TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={member.status} />
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
