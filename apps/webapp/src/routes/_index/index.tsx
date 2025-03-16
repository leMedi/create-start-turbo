import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_index/")({
  component: DashboardPostsIndexComponent,
});

function DashboardPostsIndexComponent() {
  return <div className="p-2">Select a post to view.</div>;
}
