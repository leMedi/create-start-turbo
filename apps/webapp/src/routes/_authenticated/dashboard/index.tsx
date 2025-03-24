import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { authClient } from "@acme/auth/client";

import { useTRPC } from "~/utils/trpc";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardIndexComponent,
});

function DashboardIndexComponent() {
  const session = authClient.useSession();

  if (!session.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 space-y-4 pt-2">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div>
        Welcome <b>{capitalize(session.data.user.name)}</b> to the dashboard!
      </div>
      <TrpcSession />
    </div>
  );
}

function TrpcSession() {
  const trpc = useTRPC();
  const secretMessage = useQuery(trpc.auth.getSecretMessage.queryOptions());

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">Secret Message</h2>
      <div className="text-gray-700">{secretMessage.data}</div>
    </div>
  );
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
