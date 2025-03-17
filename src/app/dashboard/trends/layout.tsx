import Dashboard from '@/components/dashboard/layout';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Saltus AI | Trends</title>
      </head>
      <body className={inter.className}>
        <Suspense>
          <Dashboard>
            {children}
          </Dashboard>
        </Suspense>
      </body>
    </html>
  );
}
