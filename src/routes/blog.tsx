import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for the /blog section. Articles live in blog.*.tsx leaves.
export const Route = createFileRoute("/blog")({
  component: () => <Outlet />,
});
