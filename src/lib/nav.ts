export type NavItem = { title: string; to: string };
export type NavGroup = { label: string; items: NavItem[] };
export type Tab = { label: string; to: string };

export const tabs: Tab[] = [
  { label: "Home", to: "/" },
  { label: "Protocol Specification", to: "/spec" },
  { label: "Python SDK", to: "/introduction" },
  { label: "CLI Tool", to: "/quickstart" },
  { label: "Examples", to: "/examples" },
  { label: "Community", to: "/community" },
];

export const sidebarByTab: Record<string, NavGroup[]> = {
  "Python SDK": [
    {
      label: "Get started",
      items: [
        { title: "Introduction", to: "/introduction" },
      ],
    },
  ],
  "CLI Tool": [
    {
      label: "Orchestration",
      items: [
        { title: "Quickstart", to: "/quickstart" },
      ],
    },
    {
      label: "Concepts",
      items: [
        { title: "What ECP checks", to: "/introduction#what-ecp-checks" },
        { title: "Developer path", to: "/introduction#developer-path" },
      ],
    },
  ],
  "Protocol Specification": [
    {
      label: "Protocol",
      items: [
        { title: "Overview", to: "/spec#overview" },
        { title: "Transports", to: "/spec#transports" },
        { title: "Methods", to: "/spec#methods" },
        { title: "Manifest", to: "/spec#manifest" },
        { title: "Reports", to: "/spec#reports" },
        { title: "Schemas", to: "/spec#schemas" },
      ],
    },
  ],
  Examples: [
    {
      label: "Demos",
      items: [
        { title: "Overview", to: "/examples" },
        { title: "Customer support", to: "/examples#customer-support" },
        { title: "Framework demos", to: "/examples#framework-demos" },
        { title: "Streamable HTTP", to: "/examples#streamable-http" },
      ],
    },
  ],
  Community: [
    {
      label: "Project",
      items: [
        { title: "Overview", to: "/community" },
        { title: "Repository", to: "/community#repository" },
        { title: "Contributing", to: "/community#contributing" },
      ],
    },
  ],
};

export function tabForPath(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/spec")) return "Protocol Specification";
  if (pathname.startsWith("/introduction")) return "Python SDK";
  if (pathname.startsWith("/quickstart")) return "CLI Tool";
  if (pathname.startsWith("/examples")) return "Examples";
  if (pathname.startsWith("/community")) return "Community";
  return "Python SDK";
}
