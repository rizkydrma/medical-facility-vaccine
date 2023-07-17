import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn('bg-white text-stone-950 antialiased', inter.className)}>
      <body className="min-h-screen bg-slate-50 dark:bg-stone-950 antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>

        {/* Allow more height for mobile menu on mobile */}
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
