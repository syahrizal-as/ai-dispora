import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Praktik AI untuk Dosen dan Profesional — ICC",
  description: "Workshop praktik AI untuk dosen Fakultas Dakwah dan Komunikasi serta peserta Bank Indonesia.",
  icons: { icon: "/assets/logo-icc.png" },
  openGraph: {
    title: "ICC — Lebih banyak praktik AI",
    description: "Pengantar singkat, empat latihan langsung, dan proyek sesuai kebutuhan peserta.",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#124d8d" };

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
