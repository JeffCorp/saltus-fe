import Dashboard from '@/components/dashboard/layout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Dashboard>
          {children}
        </Dashboard>
      </body>
    </html>
  );
}
