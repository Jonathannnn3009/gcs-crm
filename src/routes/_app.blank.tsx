import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/crm/page-header";

export const Route = createFileRoute("/_app/blank")({
  component: () => <PageHeader title="Blank" description="Bisection test route." />,
});
