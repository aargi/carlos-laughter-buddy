import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route for the /blog section. Articles live in blog.*.tsx leaves.
export const Route = createFileRoute("/blog")({
  // Non-page layout route: only the article leaves are listed in the sitemap.
  staticData: { sitemap: false },
  component: () => <Outlet />,
});
