import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { partners, loanTypes } from "@/data/crm-mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({
  component: Settings,
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Plain button-driven tabs and a plain checkbox styled as a toggle —
// no Radix Tabs/Switch here on purpose, this page just needs to look
// right for the prototype, not host that machinery permanently mounted.
const tabs = [
  { id: "banks", label: "Bank Master" },
  { id: "loan-types", label: "Loan Types" },
  { id: "organisation", label: "Organisation Details" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function PlainToggle({ defaultChecked }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(!!defaultChecked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => setChecked((c) => !c)}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full border-2 border-transparent shadow-sm transition-colors",
        checked ? "bg-primary" : "bg-input",
      )}
    >
      <span
        className={cn(
          "block h-4 w-4 rounded-full bg-background shadow-lg transition-transform",
          checked ? "translate-x-4" : "translate-x-0",
        )}
      />
    </button>
  );
}

function Settings() {
  const [tab, setTab] = useState<TabId>("banks");

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage masters and organisation configuration.</p>
      </div>

      <div className="inline-flex h-9 w-fit items-center rounded-lg bg-muted p-1 text-muted-foreground">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-md px-3 py-1 text-sm font-medium transition-colors",
              tab === t.id ? "bg-background text-foreground shadow" : "hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "banks" ? (
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
      ) : null}

      {tab === "loan-types" ? (
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
                  <PlainToggle defaultChecked />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {tab === "organisation" ? (
        <div className="space-y-4">
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
        </div>
      ) : null}
    </>
  );
}
