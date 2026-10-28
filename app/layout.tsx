import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AI Readiness — Dispora Jawa Barat",
  description: "Pengantar AI yang praktis untuk calon peserta Dispora Jawa Barat: AI agent, kualitas data, pemasangan, dan perawatan solusi AI.",
  icons: { icon: "/assets/favicon.svg" },
  openGraph: {
    title: "AI Readiness — Langkah awal, masa depan bersama AI",
    description: "Belajar, eksplorasi, dan pahami AI dalam sesi pengantar serta assessment 100 menit.",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#154d3e" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
