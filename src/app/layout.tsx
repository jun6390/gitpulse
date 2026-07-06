import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";

export const metadata: Metadata = {
  title: "GitPulse",
  description: "GitHub API 기반 개발자 분석 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-black dark:text-white">
        <Providers>
          <div className="flex min-h-screen flex-col bg-white transition-colors dark:bg-black">
            <Header />

            <main className="flex-1 bg-white transition-colors dark:bg-black">
              {children}
            </main>

            <Footer />
          </div>

          <ScrollTopButton />
        </Providers>
      </body>
    </html>
  );
}
