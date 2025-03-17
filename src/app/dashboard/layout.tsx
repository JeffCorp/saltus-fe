import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Saltus AI | Dashboard</title>
      </head>
      <body className={inter.className}>
        {/* <Dashboard> */}
        {children}
        {/* </Dashboard> */}
      </body>
    </html>
  );
}
