import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "To Do — Ackiss Homes",
  robots: { index: false, follow: false },
};

export default function TodoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
