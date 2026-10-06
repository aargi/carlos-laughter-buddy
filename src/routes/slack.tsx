import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for the /slack section. Page content lives in slack.index.tsx
// (/slack) and slack.team-building.tsx (/slack/team-building).
export const Route = createFileRoute("/slack")({
  component: () => <Outlet />,
});
