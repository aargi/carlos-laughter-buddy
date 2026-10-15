import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/laughter-therapy")({
  staticData: { sitemap: false },
  component: () => <Outlet />,
});