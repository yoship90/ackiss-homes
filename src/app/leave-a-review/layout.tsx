import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave a Review — Ackiss Homes",
  description: "Share your experience with Ackiss Homes.",
  robots: { index: false, follow: false },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
