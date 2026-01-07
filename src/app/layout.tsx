import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CVFree - Gerador de Currículos Profissionais",
  description: "Crie seu currículo profissional de forma rápida e fácil. Exporte em PDF ou Word. Totalmente gratuito.",
  keywords: ["currículo", "cv", "gerador de currículo", "emprego", "carreira", "pdf", "word"],
  authors: [{ name: "CVFree" }],
  openGraph: {
    title: "CVFree - Gerador de Currículos Profissionais",
    description: "Crie seu currículo profissional de forma rápida e fácil.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
