"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import ClientProvider from "./ClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Saltus AI is a platform that helps you learn new skills and improve your skills." />
        <meta name="keywords" content="Saltus AI, learn, skills, improve, skills, learn, skills, improve, skills, learn, skills, improve, skills" />
        <meta name="author" content="Saltus AI" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta name="msapplication-window" content="width=device-width, initial-scale=1.0" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-navbutton-color" content="#000000" />
        <meta name="msapplication-window" content="width=device-width, initial-scale=1.0" />
        <title>Saltus AI | Learn, Grow, Succeed</title>
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark">
          <ClientProvider>{children}</ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
