import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gravii — Product Intelligence That Builds Itself",
  description:
    "Gravii connects to your team's tools and automatically turns every meeting, ticket, and conversation into a scored intelligence graph. Zero-input. Evidence-based. EU-hosted.",
  openGraph: {
    title: "Gravii — Product Intelligence That Builds Itself",
    description:
      "Every signal from every team, scored and connected. Stop guessing what to build. Gravii shows you.",
    url: "https://gravii.app",
    siteName: "Gravii",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravii — Product Intelligence That Builds Itself",
    description:
      "Every signal from every team, scored and connected. Zero-input product intelligence.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
