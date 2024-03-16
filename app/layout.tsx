import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iruka',
  description:
    'Meet & Mingle: Elevating In-Person Connections for a Seamless First Encounter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <div className='flex justify-center min-h-screen bg-neutral-100'>
          <div className='container lg:max-w-4xl'>{children}</div>
        </div>
      </body>
    </html>
  );
}
