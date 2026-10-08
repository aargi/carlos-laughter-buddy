import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for the /slack section. Page content lives in slack.index.tsx
// (/slack) and slack.team-building.tsx (/slack/team-building).
export const Route = createFileRoute("/slack")({
  // Non-page layout route: only the leaf pages are listed in the sitemap.
  staticData: { sitemap: false },
  component: () => <Outlet />,
});
