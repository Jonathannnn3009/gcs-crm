import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loanTypes, team, sourcingPartners, type Lead } from "@/data/crm-mock";

const ros = team.filter((t) => t.role === "Relationship Officer").map((t) => t.name);
const sms = team.filter((t) => t.role === "Manager").map((t) => t.name);

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  contact: z.string().min(10, "Enter a 10-digit number").max(10),
  email: z.string().email().optional().or(z.literal("")),
  loanType: z.string().min(1, "Required"),
  loanAmount: z.coerce.number().positive("Required"),
  ro: z.string().min(1, "Required"),
  sm: z.string().min(1, "Required"),
  referenceType: z.enum(["Self", "Sourcing Partner"]),
  referenceName: z.string().optional(),
  employeeType: z.enum(["Salaried", "Self-Employed"]),
  monthlyIncome: z.coerce.number().positive("Required"),
  nextMeetingDate: z.string().min(1, "Required"),
  nextMeetingMode: z.enum(["In-person", "Phone", "Video Call"]),
});

type FormValues = z.infer<typeof schema>;

export function NewLeadDialog({ onCreate }: { onCreate: (lead: Lead) => void }) {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      loanType: "",
      referenceType: "Self",
      employeeType: "Salaried",
      nextMeetingMode: "In-person",
    },
  });

  const referenceType = useWatch({ control: form.control, name: "referenceType" });

  function onSubmit(values: FormValues) {
    const seq = String(Math.floor(Math.random() * 900) + 100).padStart(6, "0");
    onCreate({
      id: `GCS-L-${seq}`,
      date: new Date().toISOString().slice(0, 10),
      name: `${values.firstName} ${values.lastName}`,
      contact: values.contact,
      email: values.email || undefined,
      loanType: values.loanType,
      loanAmount: values.loanAmount,
      ro: values.ro,
      sm: values.sm,
      referenceType: values.referenceType,
      referenceName: values.referenceType === "Sourcing Partner" ? values.referenceName : undefined,
      employeeType: values.employeeType,
      monthlyIncome: values.monthlyIncome,
      nextMeetingDate: values.nextMeetingDate,
      nextMeetingMode: values.nextMeetingMode,
      status: "Pending",
    });
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand text-brand-foreground hover:bg-brand/90">
          <Plus className="mr-1.5 h-4 w-4" />
          New Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Lead</DialogTitle>
          <DialogDescription>Add a new prospect to the system.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="10-digit number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loanTypes.map((lt) => (
                        <SelectItem key={lt} value={lt}>
                          {lt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 500000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RO Officer</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select RO" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ros.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sales Manager</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select SM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sms.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referenceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Self">Self</SelectItem>
                      <SelectItem value="Sourcing Partner">Sourcing Partner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {referenceType === "Sourcing Partner" ? (
              <FormField
                control={form.control}
                name="referenceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Sourcing Partner</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select partner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sourcingPartners.map((p) => (
                          <SelectItem key={p.id} value={p.name}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div />
            )}
            <FormField
              control={form.control}
              name="employeeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Salaried">Salaried</SelectItem>
                      <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 50000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nextMeetingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Next Meeting</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nextMeetingMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Meeting Mode</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="In-person">In-person</SelectItem>
                      <SelectItem value="Phone">Phone</SelectItem>
                      <SelectItem value="Video Call">Video Call</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-brand text-brand-foreground hover:bg-brand/90">
                Create Lead
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
