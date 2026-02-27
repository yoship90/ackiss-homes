import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Send a Referral — Ackiss Homes",
  description: "Refer a friend or family member to Ackiss Homes.",
  robots: { index: false, follow: false },
};

export default function ReferralsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
