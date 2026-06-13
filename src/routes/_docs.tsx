import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { DocsSidebar } from "@/components/docs-sidebar";

export const Route = createFileRoute("/_docs")({
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_200px]">
          <DocsSidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
