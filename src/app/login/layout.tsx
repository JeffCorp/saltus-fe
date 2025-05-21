"use client";

import Navbar from "@/components/ui/Navbar";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      {children}
    </Suspense>
  );
}
