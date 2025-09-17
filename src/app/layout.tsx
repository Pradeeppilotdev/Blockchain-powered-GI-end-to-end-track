import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'TraceHarvest - Blockchain for Supply Chains',
  description:
    'A blockchain-based system to track agricultural produce from farm to consumer, ensuring transparency in pricing, quality, and origin.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased min-h-screen bg-background flex flex-col',
          inter.variable
        )}
      >
        <div className="flex-1">{children}</div>
        <footer className="py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
              A prototype for supply chain transparency.
            </p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
