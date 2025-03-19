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
    <Suspense>
      <Dashboard>
        {children}
      </Dashboard>
    </Suspense>
  );
}
