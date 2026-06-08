import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const title = "Gravii - Ask your company what it already knows";
const description =
  "A sovereign company brain for teams that hold confidential, regulated data. Ask in plain language and get answers grounded in cited evidence, or an honest \"I don't have anything on that.\" Your data stays isolated and encrypted with your own revocable key.";

export const metadata: Metadata = {
  metadataBase: new URL("https://gravii.app"),
  icons: { icon: "/favicon.svg" },
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://gravii.app",
    siteName: "Gravii",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="gv-root" data-variant="A" data-theme="light">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
