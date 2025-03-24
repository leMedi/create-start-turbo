import { createFileRoute, Outlet } from "@tanstack/react-router";

import { DashboardHeader } from "./dashboard/-components/dashboard-header";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
