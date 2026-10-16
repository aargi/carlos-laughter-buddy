import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/professionals")({
  staticData: { sitemap: false },
  component: () => <Outlet />,
});