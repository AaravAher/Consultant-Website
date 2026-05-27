import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'M.S. — Communications & PR Counsel',
  description: 'Private communications and PR advisory. Selective engagements, serious conversations.',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <div id="page-flip-line"></div>
      </body>
    </html>
  );
}
