'use client';
import Providers from '@/components/Providers';
import { MapProvider } from '@/context/useMapContext';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import 'leaflet/dist/leaflet.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn('bg-white text-stone-950 antialiased', inter.className)}>
      <body className="min-h-screen bg-stone-50 dark:bg-stone-950 antialiased">
        <Providers>
          <MapProvider>
            <main>{children}</main>
          </MapProvider>
        </Providers>

        {/* Allow more height for mobile menu on mobile */}
        {/* <div className="h-40 md:hidden" /> */}
      </body>
    </html>
  );
}
