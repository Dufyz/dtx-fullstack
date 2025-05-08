import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Desafio Técnico - Gerenciamento de Produtos",
  description: "Sistema de gerenciamento de produtos para o desafio técnico.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-auto pt-24 pb-8 lg:py-6 px-4 md:px-6 transition-all duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
