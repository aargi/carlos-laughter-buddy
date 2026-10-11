import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/laughter-yoga")({
  staticData: { sitemap: false },
  component: () => <Outlet />,
});
