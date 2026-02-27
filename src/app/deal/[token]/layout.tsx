import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Progress — Ackiss Homes",
  robots: { index: false, follow: false },
};

export default function DealLayout({ children }: { children: React.ReactNode }) {
  return children;
}
