import type { Metadata } from 'next';
import './globals.css';
import { inter, jost } from '@/lib/fonts';
import { SanityLive } from '@/sanity/lib/live';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    template: '%s | H',
    default: 'H Collection',
  },
  description: `Discover H-Collections: A curated destination for premium global brands and exclusive in-house designer labels. Shop the latest in high-end fashion and lifestyle essentials.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${inter.variable} antialiased`}>
        {children}
        <SanityLive />
        <Toaster richColors position="top-center" closeButton />
      </body>
    </html>
  );
}
