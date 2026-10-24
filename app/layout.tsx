import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beauty Kit Recommender (prototype)",
  description: "A 90-second beauty profile that builds an advisor's at-home trial kit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><main className="wrap">{children}</main></body></html>);
}
