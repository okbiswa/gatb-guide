import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GAT-B Guide — Discover Your Best-Fit Biotechnology Institutes",
  description:
    "Explore biotechnology opportunities across India based on your GAT-B 2026 performance. Get personalized recommendations based on historical cutoff data from 2021–2025.",
  keywords: [
    "GAT-B",
    "GAT-B 2026",
    "GAT-B Guide",
    "biotechnology",
    "MSc Biotechnology",
    "MTech Biotechnology",
    "institutes",
    "cutoff",
    "DBT",
    "admission",
  ],
  authors: [{ name: "GAT-B Guide" }],
  openGraph: {
    title: "GAT-B Guide — Discover Biotechnology Opportunities",
    description:
      "Explore biotechnology institutes and programmes across India based on your GAT-B score and category.",
    type: "website",
    siteName: "GAT-B Guide",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 font-sans antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
