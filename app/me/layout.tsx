import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - REDOANUZZAMAN Portfolio",
  description: "Portfolio management dashboard",
  robots: "noindex, nofollow", // Hide from search engines
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
