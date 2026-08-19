import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { PageHeader } from "@/components/crm/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { partners, loanTypes } from "@/data/crm-mock";

export const Route = createFileRoute("/_app/settings")({
  component: Settings,
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function Settings() {
  return (
    <>
      <PageHeader title="Settings" description="Manage masters and organisation configuration." />
      <Tabs defaultValue="banks">
        <TabsList>
          <TabsTrigger value="banks">Bank Master</TabsTrigger>
          <TabsTrigger value="loan-types">Loan Types</TabsTrigger>
          <TabsTrigger value="organisation">Organisation Details</TabsTrigger>
        </TabsList>

        <TabsContent value="banks" className="mt-4">
          <Card className="surface-card">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Sourcing Banks &amp; NBFCs</h3>
                <Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90">
                  <Plus className="mr-1.5 h-4 w-4" />
                  Add Sourcing Bank
                </Button>
              </div>
              <div className="divide-y divide-border rounded-lg border">
                {partners.map((bank) => (
                  <div key={bank} className="flex items-center justify-between px-4 py-2.5 text-sm">
                    <span className="text-foreground">{bank}</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loan-types" className="mt-4">
          <Card className="surface-card">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Loan Types</h3>
                <Button size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90">
                  <Plus className="mr-1.5 h-4 w-4" />
                  Add Loan Type
                </Button>
              </div>
              <div className="divide-y divide-border rounded-lg border">
                {loanTypes.map((lt) => (
                  <div key={lt} className="flex items-center justify-between px-4 py-2.5 text-sm">
                    <span className="text-foreground">{lt}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organisation" className="mt-4 space-y-4">
          <Card className="surface-card">
            <CardContent className="space-y-4 p-5">
              <h3 className="text-sm font-semibold text-foreground">Working Days Configuration</h3>
              <div className="flex flex-wrap gap-2">
                {days.map((d) => (
                  <label
                    key={d}
                    className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm has-[:checked]:border-brand has-[:checked]:bg-accent"
                  >
                    <input type="checkbox" defaultChecked={d !== "Sunday"} className="accent-brand" />
                    {d}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardContent className="space-y-4 p-5">
              <h3 className="text-sm font-semibold text-foreground">Working Hours Configuration</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Common Organisation Start Time</Label>
                  <Input type="time" defaultValue="10:00" />
                </div>
                <div className="space-y-1.5">
                  <Label>Common Organisation End Time</Label>
                  <Input type="time" defaultValue="18:00" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
